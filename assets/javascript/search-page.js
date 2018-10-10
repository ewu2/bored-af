$(document).ready(function () {

    $('.store-data').on('click', function () {

        var location = $('#location-input').val().trim();
        localStorage.setItem('Location', location);

    })

})