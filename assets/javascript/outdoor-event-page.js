
$(document).ready(function () {

    var currentLat = "";
    var currentlng = "";

    var dataValue = $(this).attr('data-value');
    localStorage.setItem('Selection', dataValue);

    initMap();
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 38.5727353, lng: -121.4690627 },
            zoom: 17
        });
        infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                currentLat = position.coords.latitude;
                currentlng = position.coords.longitude;
                console.log(currentLat);
                console.log(currentlng);
                pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent('So~ You are here!');
                infoWindow.open(map);
                map.setCenter(pos);
                /// places insertion start
                infowindow2 = new google.maps.InfoWindow();
                var service = new google.maps.places.PlacesService(map);
                service.nearbySearch({
                    location: pos,
                    radius: 1000,
                    type: localStorage.getItem("type_")
                }, callback);
                // }
                function callback(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                    }
                }
                function createMarker(place) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });
                    google.maps.event.addListener(marker, 'click', function () {
                        infowindow2.setContent(place.name);
                        infowindow2.open(map, this);
                    });
                }
                /// places insertion end
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Dude, just chill!' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);

    //////////Use my location part
    var map;
    var infoWindow;
    var pos;
    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    ////  type input zone start
    var type_;

    ////// type input zone end
    $("#map").css({ 'width': '100%', 'height': '600px' });


    /////////////////Input location part
    // Get location form
    //     var locationForm = document.getElementById('location-form');
    //     var lat1;
    //     var lng1;
    //     // Listen for submit
    //     locationForm.addEventListener('submit', geocode);
    //     // console.log(geocode);
    //     function geocode(e) {
    //         // Prevent actual submit
    //         e.preventDefault();
    //         var location = document.getElementById('location-input').value;
    //         console.log(location);
    //         axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    //             params: {
    //                 address: location,
    //                 key: 'AIzaSyB_Ysiwo120-OhLQWl94a8kFJ6bMZ8ikW8'
    //             }
    //         })
    //             .then(function (response) {
    //                 // Log full response
    //                 console.log(response);
    //                 // Formatted Address
    //                 //                 var formattedAddress = response.data.results[0].formatted_address;
    //                 //                 var formattedAddressOutput = `
    //                 //   <ul class="list-group">
    //                 //     <li class="list-group-item">${formattedAddress}</li>
    //                 //   </ul>
    //                 // `;
    //                 // Address Components
    //                 //                 var addressComponents = response.data.results[0].address_components;
    //                 //                 var addressComponentsOutput = '<ul class="list-group">';
    //                 //                 for (var i = 0; i < addressComponents.length; i++) {
    //                 //                     addressComponentsOutput += `
    //                 //     <li class="list-group-item"><strong>${addressComponents[i].types[0]}</strong>: ${addressComponents[i].long_name}</li>
    //                 //   `;
    //                 //                 }
    //                 //                 addressComponentsOutput += '</ul>';
    //                 // Geometry
    //                 lat1 = response.data.results[0].geometry.location.lat;
    //                 lng1 = response.data.results[0].geometry.location.lng;
    //                 //                 var geometryOutput = `
    //                 //   <ul class="list-group">
    //                 //     <li class="list-group-item"><strong>Latitude</strong>: ${lat1}</li>
    //                 //     <li class="list-group-item"><strong>Longitude</strong>: ${lng1}</li>
    //                 //   </ul>
    //                 // `;
    //                 initMap();
    //                 // Output to app
    //                 // document.getElementById('formatted-address').innerHTML = formattedAddressOutput;
    //                 // document.getElementById('address-components').innerHTML = addressComponentsOutput;
    //                 // document.getElementById('geometry').innerHTML = geometryOutput;
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //         ////same code from my location with some adaptation

    //         function initMap() {

    //             map = new google.maps.Map(document.getElementById('map'), {
    //                 center: { lat: 38.5727353, lng: -121.4690627 },
    //                 zoom: 17
    //             });
    //             infoWindow = new google.maps.InfoWindow;
    //             // console.log('this is lat' + lat2);
    //             pos = {
    //                 lat: lat1,
    //                 lng: lng1
    //             };
    //             infoWindow.setPosition(pos);
    //             infoWindow.setContent('So~ You like here!');
    //             infoWindow.open(map);
    //             map.setCenter(pos);
    //             /// places insertion start
    //             infowindow2 = new google.maps.InfoWindow();
    //             var service = new google.maps.places.PlacesService(map);
    //             service.nearbySearch({
    //                 location: pos,
    //                 radius: 1000,
    //                 type: localStorage.getItem("type_")
    //             }, callback);
    //             // }
    //             function callback(results, status) {
    //                 if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                     for (var i = 0; i < results.length; i++) {
    //                         createMarker(results[i]);
    //                     }
    //                 }
    //             }
    //             function createMarker(place) {
    //                 var placeLoc = place.geometry.location;
    //                 var marker = new google.maps.Marker({
    //                     map: map,
    //                     position: place.geometry.location
    //                 });
    //                 google.maps.event.addListener(marker, 'click', function () {
    //                     infowindow2.setContent(place.name);
    //                     infowindow2.open(map, this);
    //                 });
    //             }
    //             /// places insertion end
    //         }
    //     }
    // })


    $(document).on('click', '#show-map', function () {
        $('.modal').fadeIn(700);
        $('.modal').modal('show');
        //
    })


})



