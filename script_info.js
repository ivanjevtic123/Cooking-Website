$(document).ready(function() { 
    document.cookie = "SameSite=None; Secure";
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    $('#english').bind('click', function(){
        window.location.href = "z_info.html";
        return false;
    });

});