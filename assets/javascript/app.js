$(document).ready(function () {


    $('#next-page').on('click', function () {
        $('#page-1').css('display', "none");
        //this will display the arrow so we can go back
        $('.backarrow').css('visibility', 'visible');
        $('#page-2').css('display', 'block');
        $('.box-1').fadeIn();
        $('.box-2').fadeIn(1000);
        $('.box-3').fadeIn(2000);
    })
})