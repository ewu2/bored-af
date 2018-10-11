
$(document).ready(function () {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb24zMTQwIiwiYSI6ImNqbW53b2RsMDBmN3YzcHFvemVqMjcwMWgifQ.uSJyJkrDOWjV8xfUcaREtA';
    var photoResponse = [];
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-87.6321, 41.8362],
        boxZoom: true,
        showZoom: true,
        fadeDuration: 2000,
        trackResize: true,
        zoom: 13,
    });
    // Add geolocate control to the map.
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    map.addControl(new mapboxgl.FullscreenControl());

    map.addControl(new MapboxDirections({
        accessToken: mapboxgl.accessToken
    }), 'top-left');


    // Add rout
    map.on('load', function () {
        getRoute();
    });

    function getRoute() {
        var start = [-84.518641, 39.134270];
        var end = [-84.512023, 39.102779];
        var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?geometries=geojson&access_token=' + mapboxgl.accessToken;
        $.ajax({
            method: 'GET',
            url: directionsRequest,
        }).done(function (data) {
            var route = data.routes[0].geometry;
            map.addLayer({
                id: 'route',
                type: 'line',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: route
                    }
                },
                paint: {
                    'line-width': 2
                }
            });
            // this is where the code from the next step will go
        });
    }

    $(document).on('click', '#show-map', function () {

        $('.modal').fadeIn(500);
        $('.modal').modal('show');
        console.log('test');
    })

    function getPhotos() {
        var currentSearch = localStorage.getItem('Selection');
        var queryUrl = 'https://api.unsplash.com/search/photos/?page=1&per_page=15&query=${' + currentSearch + '}&client_id=93d09a8e266e8e581415b2760c6d3fdbbf963d9885a32aab642cc31d23a58ea0';

        $.ajax({
            url: queryUrl,
            type: 'GET',


        }).then(function (response) {
            for (var i = 0; i < response.results.length; i++) {
                photoResponse[i] = response.results[i];
            }
        })
    }

    getPhotos();

    displaySearch();
    var rowCount = 0;
    var eventCount = 0;
    var isFirst = true;
    function displaySearch() {



        var oArgs = {

            app_key: 'PrJ2Sw3S8JHpBf9V',

            q: localStorage.getItem('Selection'),

            where: localStorage.getItem('Location'),

            "date": "Today",

            page_size: 15,

            sort_order: "popularity",

        };

        EVDB.API.call("/events/search", oArgs, function (oData) {

            for (var i = 0; i < oData.events.event.length; i++) {


                if (isFirst) {
                    rowCount++;
                    //create first row
                    var newRow = $("<div>");
                    newRow.addClass('row');
                    newRow.addClass('row-' + rowCount);
                    $('#show-page').append(newRow);

                    isFirst = false;
                }


                var newEvent = $('<div>');
                newEvent.addClass('col-md-4');

                $('.row-' + rowCount).append(newEvent);

                var newCard = $('<div>');
                newCard.addClass('card');

                newEvent.append(newCard);

                var cardTitle = $('<h5>');
                cardTitle.addClass('card-title');
                cardTitle.text(oData.events.event[i].title);

                var newImage = $('<img>');
                newImage.addClass('card-img-top');
                newImage.attr('src', photoResponse[i].urls.small);

                var cardBody = $('<div>');
                cardBody.addClass('card-body');
                cardBody.attr('id', 'adjust-text');

                newCard.append(cardTitle);

                newCard.append(newImage);

                newCard.append(cardBody);

                newA = $('<a>');
                newA.addClass('btn');
                newA.addClass('btn-primary');
                newA.attr('href', oData.events.event[i].url);
                newA.attr('target', '_blank');
                newA.text("Click for more Info");


                newButton = $('<button>');
                newButton.attr('id', 'show-map');
                newButton.addClass('btn');
                newButton.addClass('btn-dark');
                newButton.text('Get Directions');
                newButton.attr('latitude', oData.events.event[i].latitude);
                newButton.attr('longitude', oData.events.event[i].longitude);

                cardBody.append(oData.events.event[i].description);
                cardBody.append('<br>');
                cardBody.append(newA);
                cardBody.append('<br>');
                cardBody.append(newButton);

                eventCount++;


                if (eventCount >= 3) {
                    isFirst = true;
                    eventCount = 0;
                }
            }

        });

    }




})

