$(document).ready(function() { 
    
    

    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));
    //let mealsSplited = mealsArr_LS.split(",");
    //alert(mealsSplited);
    let mealsPom = [];
    
    for(let i = 0; i < mealsArr_LS.length; i++) {
        if(mealsArr_LS[i].grupa == "predjelo") {
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
            ).append("<br>").append("<button class='btn btn-secondary' id='"+mealsPom[i].id+"'>Vidi recept</button>");
        }
    }

    $("button").click(function() {
        //alert("click");
        let id = $(this).attr('id');
        if(id == "btnPretraga") { //pretraga
            myFunction();
            return;
        }
        if(id == "btnSortiranje") {
            sortMeals();
            return;
        }
        if(id == "logoutBtn") {
            return;
        }
        //idi na solo recept:
        goToSoloRecept(id);
    });

    function goToSoloRecept(id) {
        localStorage.setItem('soloRecept', id.toString());
        window.location.href = "soloRecept.html";
        return false;
    }

    //search engine:
    function myFunction() {
        $("#recepti").empty();
        meals_search = mealsArr_LS;

        let searchText = $("#myInputSearch").val();

        if(searchText == '') { //unet prazan text u search => prikazi sve
            for(let i = 0; i < meals_search.length; i++) {
                if (meals_search[i].grupa == "predjelo") {
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_search[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_search[i].galerija)
                                .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Ocena:</h3>" + 
                        "<div class='text_desert'>" + (meals_search[i].zbir / ((meals_search[i].suma)==0 ? 1 : meals_search[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Tezina:</h3>" +
                        "<div class='text_desert'>" +meals_search[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_search[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_search[i].id+"'>Vidi recept</button>");
                }
            }
            return;
        }

        //unet text:
        for (let i = 0; i < meals_search.length; i++) {
            if (meals_search[i].grupa == "predjelo" && meals_search[i].ime.includes(searchText)){
                $("#recepti").append("<hr>").append(
                    '<h2>'+meals_search[i].ime+'</h2>'
                ).append("<br>").append(
                    $("<img>").attr("src", meals_search[i].galerija)
                              .addClass("img_desert")
                ).append("<br><br>").
                append(
                    "<h3>Ocena:</h3>" + 
                    "<div class='text_desert'>" + (meals_search[i].zbir / ((meals_search[i].suma)==0 ? 1 : meals_search[i].suma)).toFixed(2) + "</div>"
                    + "<br>" + "<h3>Tezina:</h3>" +
                    "<div class='text_desert'>" +meals_search[i].tezina+ "</div>" 
                ).append(
                    "<div class='text_desert'>"+meals_search[i].uputstvo+"</div>"
                ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_search[i].id+"'>Vidi recept</button>");
            }
        }
    }

    //sortiranje:
    function sortMeals() {
        //$("#recepti").empty();
        meals_sorted = mealsPom;

        //kriterijum:
        let kriterijumPom = document.querySelectorAll('input[name="kriterijum"]');
        let kriterijum;//izabran
        for (let rb of kriterijumPom) {
            if (rb.checked) {
                kriterijum = rb.value;
                break;
            }
        }
        
        //nacin:
        let nacinPom = document.querySelectorAll('input[name="nacin"]');
        let nacin;//izabran
        for (let rb of nacinPom) {
            if (rb.checked) {
                nacin = rb.value;
                break;
            }
        }
        
        if(nacin == null || kriterijum == null) {
            alert("Izaberite nacin soritranja!");
            return;
        }

        $("#recepti").empty();

        //kriterijum:
        if(kriterijum == "ocena") {
            meals_sorted.sort(ocenaCompare);
        } else if(kriterijum == "tezina") {
            meals_sorted.sort(tezinaCompare);
        }

        //nacin->smer obilaska:
        if(nacin == "rastuce") {
            for(let i = 0; i < meals_sorted.length; i++) {
                if (meals_sorted[i].grupa == "predjelo"){
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_sorted[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_sorted[i].galerija)
                                .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Ocena:</h3>" + 
                        "<div class='text_desert'>" + (meals_sorted[i].zbir / ((meals_sorted[i].suma)==0 ? 1 : meals_sorted[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Tezina:</h3>" +
                        "<div class='text_desert'>" +meals_sorted[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_sorted[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_sorted[i].id+"'>Vidi recept</button>");
                }
            }
        } else if(nacin == "opadajuce") {
            for(let i = meals_sorted.length - 1; i >= 0; i--) {
                if (meals_sorted[i].grupa == "predjelo") {
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_sorted[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_sorted[i].galerija)
                                  .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Ocena:</h3>" + 
                        "<div class='text_desert'>" + (meals_sorted[i].zbir / ((meals_sorted[i].suma)==0 ? 1 : meals_sorted[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Tezina:</h3>" +
                        "<div class='text_desert'>" +meals_sorted[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_sorted[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_sorted[i].id+"'>Vidi recept</button>");
                }
            }
        }

    }

    //tezina compare:
    function tezinaCompare(meal1, meal2) {
        if(meal1.tezina < meal2.tezina) {
            return -1;
        }
        if(meal1.tezina > meal2.tezina) {
            return 1;
        }
        return 0;
    }

    //ocena compare:
    function ocenaCompare(meal1, meal2) {
        let ocena1 = meal1.zbir / ((meal1.suma)==0 ? 1 : meal1.suma);
        let ocena2 = meal2.zbir / ((meal2.suma)==0 ? 1 : meal2.suma);
        if(ocena1 < ocena2) {
            return -1;
        }
        if(ocena1 > ocena2) {
            return 1;
        }
        return 0;
    }

    $('#english').bind('click', function(){
        window.location.href = "z_predjelo.html";
        return false;
    });


});
