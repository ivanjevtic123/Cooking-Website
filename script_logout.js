$(document).ready(function() { 

    //alert("logout");
    $("#logoutBtn").click(function() { 
        var r = confirm("Odjavi se?");
        if (r == true) {
            localStorage.setItem("user", ""); //da niko ne bude prijavljen

            window.location.href = "login.html";
            return false;
        } else {
            return;
        }
    });

});