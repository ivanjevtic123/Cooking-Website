$(document).ready(function() { 
    document.cookie = "SameSite=None; Secure";
    
    if(localStorage.getItem('user') == '') {
        alert("You're not logged in!");
        window.location.href = "z_login.html";
        return false;
    }

    $('#serbian').bind('click', function(){
        window.location.href = "info.html";
        return false;
    });


});