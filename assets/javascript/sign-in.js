/**
 * @license
 * 	Copyright 2018, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var config = {
    apiKey: "AIzaSyA1CRSWnlG1cwcqVTSOJDTuWY7vW5OMf90",
    authDomain: "bored-project.firebaseapp.com",
    databaseURL: "https://bored-project.firebaseio.com",
    projectId: "bored-project",
    storageBucket: "bored-project.appspot.com",
    messagingSenderId: "232954052621",

    clientId: "42862000042-vrga0sd70rjum6q9sa2c36fcbfoohjvk.apps.googleusercontent.com"
};

firebase.initializeApp(config);

var uiConfig = {
    signInSuccessUrl: "https://ewu2.github.io/bored-af/page-1.html", // Assuming you are running on your local machine
    signInOptions: [
        {
            provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            scopes: config.scopes
        }
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>"
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

// This function will trigger when there is a login event
firebase.auth().onAuthStateChanged(function (user) {
    console.log(user)
    // Make sure there is a valid user object
    if (user) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://apis.google.com/js/api.js";
        // Once the Google API Client is loaded, you can run your code
        script.onload = function (e) {
            // Initialize the Google API Client with the config object
            gapi.client
                .init({
                    apiKey: config.apiKey,
                    clientId: config.clientID,
                    discoveryDocs: config.discoveryDocs,
                    scope: config.scopes.join(" ")
                })
                // Loading is finished, so start the app
                .then(function () {
                    // Make sure the Google API Client is properly signed in
                    if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
                        startApp(user);
                    } else {
                        firebase.auth().signOut(); // Something went wrong, sign out
                    }
                });
        };
        // Add to the document
        document.getElementsByTagName("head")[0].appendChild(script);
    }
});

function startApp(user) {
    console.log(user);

    // Make sure to refresh the Auth Token in case it expires!
    firebase.auth().currentUser.getToken()
        .then(function () {
            return gapi.client.calendar.events
                .list({
                    calendarId: "primary",
                    timeMin: new Date().toISOString(),
                    showDeleted: false,
                    singleEvents: true,
                    maxResults: 10,
                    orderBy: "startTime"
                })
        })
        .then(function (response) {
            console.log(response);
        });
}