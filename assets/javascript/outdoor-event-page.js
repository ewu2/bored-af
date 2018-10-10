
$(document).ready(function () {

    mapboxgl.accessToken = 'pk.eyJ1IjoiZ29uemFsb24zMTQwIiwiYSI6ImNqbW53b2RsMDBmN3YzcHFvemVqMjcwMWgifQ.uSJyJkrDOWjV8xfUcaREtA';

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







})

