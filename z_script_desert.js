$(document).ready(function() { 
    
    
    if(localStorage.getItem('user') == '') {
        alert("You're not logged in!");
        window.location.href = "z_login.html";
        return false;
    }

    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));
    //let mealsSplited = mealsArr_LS.split(",");
    //alert(mealsSplited);
    let mealsPom = [];
    
    for(let i = 0; i < mealsArr_LS.length; i++) {
        if(mealsArr_LS[i].grupa == "desert") {
            mealsPom.push(mealsArr_LS[i]);
        }
    }

    if(mealsPom == null) { //nema deserata:
        $("#recepti").append("<h2>"+"No desserts are available"+"</h2>").append("<hr>")
    } else { //ima deserata:
        for(let i = 0; i < mealsPom.length; i++) {
            $("#recepti").append("<hr>").append(
                '<h2>'+mealsPom[i].ime+'</h2>'
            ).append("<br>").append(
                $("<img>").attr("src", mealsPom[i].galerija)
                          .addClass("img_desert")
            ).append("<br><br>").
            append(
                "<h3>Rate:</h3>" + 
                "<div class='text_desert'>" + (mealsPom[i].zbir / ((mealsPom[i].suma)==0 ? 1 : mealsPom[i].suma)).toFixed(2) + "</div>"
                + "<br>" + "<h3>Level:</h3>" +
                "<div class='text_desert'>" +mealsPom[i].tezina+ "</div>" 
            ).append(
                "<div class='text_desert'>"+mealsPom[i].uputstvo+"</div>"
            ).append("<br>").append("<button class='btn btn-secondary' id='"+mealsPom[i].id+"'>Go to recepie</button>");
        }
    }

    $("button").click(function() {
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
        //alert(id.toString());
        window.location.href = "z_soloRecept.html";
        return false;
    }

    //search engine:
    function myFunction() {
        $("#recepti").empty();
        meals_search = mealsArr_LS;

        let searchText = $("#myInputSearch").val();

        if(searchText == '') { //unet prazan text u search => prikazi sve
            for(let i = 0; i < meals_search.length; i++) {
                if (meals_search[i].grupa == "desert") {
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_search[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_search[i].galerija)
                                .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Rate:</h3>" + 
                        "<div class='text_desert'>" + (meals_search[i].zbir / ((meals_search[i].suma)==0 ? 1 : meals_search[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Level:</h3>" +
                        "<div class='text_desert'>" +meals_search[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_search[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_search[i].id+"'>Go to recepie</button>");
                }
            }
            return;
        }

        //unet text:
        for (let i = 0; i < meals_search.length; i++) {
            if (meals_search[i].grupa == "desert" && meals_search[i].ime.includes(searchText)){
                $("#recepti").append("<hr>").append(
                    '<h2>'+meals_search[i].ime+'</h2>'
                ).append("<br>").append(
                    $("<img>").attr("src", meals_search[i].galerija)
                              .addClass("img_desert")
                ).append("<br><br>").
                append(
                    "<h3>Rate:</h3>" + 
                    "<div class='text_desert'>" + (meals_search[i].zbir / ((meals_search[i].suma)==0 ? 1 : meals_search[i].suma)).toFixed(2) + "</div>"
                    + "<br>" + "<h3>Level:</h3>" +
                    "<div class='text_desert'>" +meals_search[i].tezina+ "</div>" 
                ).append(
                    "<div class='text_desert'>"+meals_search[i].uputstvo+"</div>"
                ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_search[i].id+"'>Go to recepie</button>");
            }
        }
    }

    //sortiranje:
    function sortMeals() {
        //$("#recepti").empty();
        meals_sorted = mealsArr_LS;

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
            alert("Select a sorting criteria!");
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
                if (meals_sorted[i].grupa == "desert"){
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_sorted[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_sorted[i].galerija)
                                .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Rate:</h3>" + 
                        "<div class='text_desert'>" + (meals_sorted[i].zbir / ((meals_sorted[i].suma)==0 ? 1 : meals_sorted[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Level:</h3>" +
                        "<div class='text_desert'>" +meals_sorted[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_sorted[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_sorted[i].id+"'>Go to recepie</button>");
                }
            }
        } else if(nacin == "opadajuce") {
            for(let i = meals_sorted.length - 1; i >= 0; i--) {
                if (meals_sorted[i].grupa == "desert") {
                    $("#recepti").append("<hr>").append(
                        '<h2>'+meals_sorted[i].ime+'</h2>'
                    ).append("<br>").append(
                        $("<img>").attr("src", meals_sorted[i].galerija)
                                  .addClass("img_desert")
                    ).append("<br><br>").
                    append(
                        "<h3>Rate:</h3>" + 
                        "<div class='text_desert'>" + (meals_sorted[i].zbir / ((meals_sorted[i].suma)==0 ? 1 : meals_sorted[i].suma)).toFixed(2) + "</div>"
                        + "<br>" + "<h3>Level:</h3>" +
                        "<div class='text_desert'>" +meals_sorted[i].tezina+ "</div>" 
                    ).append(
                        "<div class='text_desert'>"+meals_sorted[i].uputstvo+"</div>"
                    ).append("<br>").append("<button class='btn btn-secondary' id='"+meals_sorted[i].id+"'>Go to recepie</button>");
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

    $('#serbian').bind('click', function(){
        window.location.href = "desert.html";
        return false;
    });

});
