$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    let username_curr = localStorage.getItem('user');

    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));

    let mealsPom = []; //jela koja sam ja komentarisao


    for(let i = 0; i < mealsArr_LS.length; i++) {
        for(let j = 0; j < mealsArr_LS[i].ocene_usernames.length; j++) {
            if(mealsArr_LS[i].ocene_usernames[j] == username_curr) {
                if(!mealsPom.includes(mealsArr_LS[i])) {
                    mealsPom.push(mealsArr_LS[i]);
                    break; //MOZE 1 DA OCENI SVAKAKO
                }
            }
        } 
    }

    if(mealsPom == null) { //nema jela koja sam ocenio:
        $("#recepti").append("<h2>"+"Nista niste ocenili"+"</h2>").append("<hr>")
    } else { //ima jela koja sam ocenio:
        for(let i = 0; i < mealsPom.length; i++) {
            $("#recepti").append("<hr>").append(
                '<h2>'+mealsPom[i].ime+'</h2>'
            ).append("<br>").append(
                $("<img>").attr("src", mealsPom[i].galerija)
                          .addClass("img_desert")
            ).append("<br><br>");
            
            $("#recepti").append("<h3>Moja ocena:</h3><br>");
            for(let j = 0; j < mealsPom[i].ocene.length; j++) {//ocene
                if(mealsPom[i].ocene_usernames[j] == username_curr) {//ocene_usernames
                    $("#recepti").append(
                        "<h5>" + mealsPom[i].ocene[j] + "</h5>" + "<br>"      //ocene[j]
                    );
                }
            }
        }
    }

    $('#english').bind('click', function(){
        window.location.href = "z_mojeOcene.html";
        return false;
    });


});
