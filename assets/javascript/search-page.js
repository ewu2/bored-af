$(document).ready(function () {

    $('.store-data').on('click', function () {

        var location = $('#location-input').val().trim();
        localStorage.setItem('Location', location);

        var name = $('#name-input').val().trim();
        localStorage.setItem('Name', name);
    })

})