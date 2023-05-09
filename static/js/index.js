$('document').ready(function(){
    $('.nav-mobile-toggle').click(function(){
        $('.list-items').css('display', 'flex');
        $('.nav-mobile-close').show();
        $('.nav-mobile-toggle').hide();
    });

    $('.nav-mobile-close').click(function(){
        $('.list-items').hide();
        $('.nav-mobile-close').hide();
        $('.nav-mobile-toggle').show();
    });

    // logo to route index.html
    $('#logo').click(function(){
        window.location.href = 'index.html';
    })
});