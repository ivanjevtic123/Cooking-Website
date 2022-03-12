$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("You're not logged in!");
        window.location.href = "z_login.html";
        return false;
    }


    $("#recepti").click(function() {
        window.location.href = "z_mojiRecepti.html";
        return false;
    });
    
    $("#komentari").click(function() {
        window.location.href = "z_mojiKomentari.html";
        return false;
    });

    $("#ocene").click(function() {
        window.location.href = "z_mojeOcene.html";
        return false;
    });

    $('#serbian').bind('click', function(){
        window.location.href = "mojNalog.html";
        return false;
    });

});