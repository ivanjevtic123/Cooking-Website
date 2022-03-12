$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    let username_curr = localStorage.getItem('user');

    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));

    let mealsPom = [];

    for(let i = 0; i < mealsArr_LS.length; i++) {
        if(mealsArr_LS[i].username == username_curr) {
            mealsPom.push(mealsArr_LS[i]);
        }
    }

    if(mealsPom == null) { //nema deserata:
        $("#recepti").append("<h2>"+"Nema dostupnih recepata"+"</h2>").append("<hr>")
    } else { //ima deserata:
        for(let i = 0; i < mealsPom.length; i++) {
            $("#recepti").append("<hr>").append(
                '<h2>'+mealsPom[i].ime+'</h2>'
            ).append("<br>").append(
                $("<img>").attr("src", mealsPom[i].galerija)
                          .addClass("img_desert")
            ).append("<br><br>").
            append(
                "<h3>Ocena:</h3>" + 
                "<div class='text_desert'>" + (mealsPom[i].zbir / ((mealsPom[i].suma)==0 ? 1 : mealsPom[i].suma)).toFixed(2) + "</div>"
                + "<br>" + "<h3>Tezina:</h3>" +
                "<div class='text_desert'>" +mealsPom[i].tezina+ "</div>" 
            ).append(
                "<div class='text_desert'>"+mealsPom[i].uputstvo+"</div>"
            ).append("<br>").append("<button class='btn btn-secondary' id='"+mealsPom[i].id+"'>Obrisi</button>");
        }
    }


    $("button").click(function() {
        let id = $(this).attr('id');
        obrisiRecept(id);
    });

    function obrisiRecept(id) {
        for(let i = 0; i < mealsArr_LS.length; i++) {
            if(mealsArr_LS[i].id == id) {
                mealsArr_LS.splice(i, 1);
                break;
            }
        }

        localStorage.setItem('meals', JSON.stringify(mealsArr_LS));

        window.location.href = "mojiRecepti.html";
        return false;
    }

    $('#english').bind('click', function(){
        window.location.href = "z_mojiRecepti.html";
        return false;
    });


});
