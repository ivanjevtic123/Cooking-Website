$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("You're not logged in!");
        window.location.href = "login.html";
        return false;
    }

    let username_curr = localStorage.getItem('user');

    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));

    let mealsPom = []; //jela koja sam ja komentarisao


    for(let i = 0; i < mealsArr_LS.length; i++) {
        for(let j = 0; j < mealsArr_LS[i].komentari_usernames.length; j++) {
            if(mealsArr_LS[i].komentari_usernames[j] == username_curr) {
                if(!mealsPom.includes(mealsArr_LS[i])) {
                    mealsPom.push(mealsArr_LS[i]);
                }
            }
        } 
    }

    if(mealsPom == null) { //nema jela koja sam komentarisao:
        $("#recepti").append("<h2>"+"You haven't left any comments"+"</h2>").append("<hr>")
    } else { //ima deserata:
        for(let i = 0; i < mealsPom.length; i++) {
            $("#recepti").append("<hr>").append(
                '<h2>'+mealsPom[i].ime+'</h2>'
            ).append("<br>").append(
                $("<img>").attr("src", mealsPom[i].galerija)
                          .addClass("img_desert")
            ).append("<br><br>");
            //alert("ispis: " + i);
            
            $("#recepti").append("<h3>My comments:</h3><br>");
            for(let j = 0; j < mealsPom[i].komentari.length; j++) {
                if(mealsPom[i].komentari_usernames[j] == username_curr) {
                    $("#recepti").append(
                        "<h5>" + mealsPom[i].komentari[j] + "</h5>" + "<br>"
                    );
                }
            }
        }
    }


    $('#serbian').bind('click', function(){
        window.location.href = "mojiKomentari.html";
        return false;
    });

});
