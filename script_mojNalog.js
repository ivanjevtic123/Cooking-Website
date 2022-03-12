$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }


    $("#recepti").click(function() {
        window.location.href = "mojiRecepti.html";
        return false;
    });
    
    $("#komentari").click(function() {
        window.location.href = "mojiKomentari.html";
        return false;
    });

    $("#ocene").click(function() {
        window.location.href = "mojeOcene.html";
        return false;
    });

    $('#english').bind('click', function(){
        window.location.href = "z_mojNalog.html";
        return false;
    });


});