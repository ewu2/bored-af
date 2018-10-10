$(document).ready(function () {



    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA1CRSWnlG1cwcqVTSOJDTuWY7vW5OMf90",
        authDomain: "bored-project.firebaseapp.com",
        databaseURL: "https://bored-project.firebaseio.com",
        projectId: "bored-project",
        storageBucket: "bored-project.appspot.com",
        messagingSenderId: "232954052621"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    var chatRoom = database.ref('/Chat-Room');


    $(document).on('click', '#send-message', function (e) {
        e.preventDefault();
        $('.card-body').empty();
        var text = $('#message').val().trim();
        chatRoom.push({
            name: localStorage.getItem('Name'),
            Message: text,
        });

        chatRoom.on('child_added', function (snap) {

            var newH = $('<h5>');
            newH.attr('id', 'user-name');
            newH.text(snap.val().name);
            var newP = $('<p>');


            newP.text(snap.val().Message);
            newP.attr('id', 'chat-messages');
            $('.card-body').prepend(newP);
            $('.card-body').prepend(newH);


        })
    })
})