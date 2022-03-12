$(document).ready(function() { 

    //alert("logout");
    $("#logoutBtn").click(function() { 
        var r = confirm("Log out?");
        if (r == true) {
            localStorage.setItem("user", ""); //da niko ne bude prijavljen

            window.location.href = "z_login.html";
            return false;
        } else {
            return;
        }
    });

});