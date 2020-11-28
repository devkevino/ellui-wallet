$(document).ready(function() {

    $('#sideMenuBtn').click(function() {
        $('.ui.sidebar').sidebar('toggle');
    });

    setMenuActive();

});

function setMenuActive() {
    if(pageName) {
        $('#menu_'+pageName).addClass('active');
    }
}

function logout() {

    $.ajax({
        method: "POST",
        url: "/user/logout",
    })
    .done(function( msg ) {
        console.dir(msg);
        
        if(msg.result === 'ok') {
            location.href = '/';
        }
 
    });

}



