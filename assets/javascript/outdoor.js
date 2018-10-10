$(document).ready(function () {

    $(document).on('click', '.fas', function () {
        var selection = $(this).attr('data-value');
        console.log(selection);

        //submit to local storage
        localStorage.setItem('Selection', selection);
    })

    $(document).on('click', '.search-btn', function () {
        var selection = $('#get-search').val().trim();
        console.log(selection);
        localStorage.setItem('Selection', selection);
    })
})