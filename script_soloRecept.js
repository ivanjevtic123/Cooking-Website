$(document).ready(function() {

    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    let id = JSON.parse(localStorage.getItem('soloRecept'));
    //alert(id);

    let recept = null;
    let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));

    for(let i = 0; i < mealsArr_LS.length; i++) {
        if(mealsArr_LS[i].id == id) {
            recept = mealsArr_LS[i];
            break;
        }
    }

    $("#putanja").append(recept.grupa + "/").append(recept.ime);

    if(recept != null) {
        $("#recept_solo").append("<hr>").append(
            '<h2>'+recept.ime+'</h2>'
        ).append("<br>").append(
            $("<img>").attr("src", recept.galerija)
                      .addClass("img_desert")
        ).append("<br><br>").
        append(
            "<h3>Ocena:</h3>" + 
            "<div class='text_desert'>" + (recept.zbir / ((recept.suma)==0? 1 : recept.suma)).toFixed(2) + "</div>"
            + "<br>" + "<h3>Tezina:</h3>" +
            "<div class='text_desert'>" +recept.tezina+ "</div>" 
        ).append(
            "<div class='text_desert'>"+recept.uputstvo+"</div>"
        ).append("<br>").append(
            "<video width='420' height='240' controls>"+
            "<source src='"+recept.video+"' type='video/mp4'>"
            +"</video>"
        ).append("<hr>").append("<h2>Komenatari</h2>").append("<br>");

        let komentari = recept.komentari;

        for(let i = 0; i < komentari.length; i++) {
            $("#recept_solo").append(
                "<div class='text_desert'>"+komentari[i]+"</div>"+"<br>"
            ); 
        }

        $("#recept_solo").append("<br>").append("<hr>").append("<br>").append("<h2>Preuzimanje</h2>").append("<br>").append(
            "<button id='preuzmiPdf' class='btn btn-secondary'>Preuzmi PDF</button>"
        ).append("<br>");

    }


    let username_curr = localStorage.getItem('user');
    let user_curr = null;
    let users = JSON.parse(localStorage.getItem('allUsers'));

    for(let i = 0; i < users.length; i++) {
        if(users[i].username = username_curr) {
            user_curr = users[i];
        }
    }

    $("#submitKomentar").click(function() {
        let komentar = $("#komentar").val();
        
        
        let username_curr = localStorage.getItem('user');
        //alert(username_curr);
        /*
        let user_curr = null;
        let users = JSON.parse(localStorage.getItem('allUsers'));
        let vecPostojiKomentar = false;
        for(let i = 0; i < users.length; i++) {
            if(users[i].username = username_curr) {
                for(let j = 0; j < users[i].komentari.length; j++) {
                    if(users[i].komentari[j] == id) {
                        vecPostojiKomentar = true;
                        break;
                    }
                }
                if(vecPostojiKomentar == true) break;

                users[i].komentari.push(id);//ne postoji komentar, moze da komentarise, cuvamo ga
            }
        }*/
        let mealsArr_LS_2 = JSON.parse(localStorage.getItem('meals'));

        for(let i = 0; i < mealsArr_LS_2.length; i++) {
            if(mealsArr_LS_2[i].id == id) {
                mealsArr_LS_2[i].komentari.push(komentar);                
                mealsArr_LS_2[i].komentari_usernames.push(username_curr);
                
                localStorage.setItem('meals', JSON.stringify(mealsArr_LS_2));

                break;
            }
        }
    });

    $("#submitOcena").click(function() {
        let ocena = $("#ocena_input").val();
        
        let username_curr = localStorage.getItem('user');

        let mealsArr_LS_3 = JSON.parse(localStorage.getItem('meals'));

        let vecPostojiOcena = false;
        for(let i = 0; i < mealsArr_LS_3.length; i++) {
            if(mealsArr_LS_3[i].id == id) {//zbir, suma++
                //samo 1 moze da oceni 1 korisnik:
                for(let j = 0; j < mealsArr_LS_3[i].ocene_usernames.length; j++) {
                    if(mealsArr_LS_3[i].ocene_usernames[j] == username_curr) {
                        vecPostojiOcena = true;
                        alert("Vec ste dali ocenu datom receptu!");
                        break;
                    }
                }
                if(vecPostojiOcena == true) break;

                let pomZbir = parseInt(mealsArr_LS_3[i].zbir);
                pomZbir += parseInt(ocena);
                mealsArr_LS_3[i].zbir = pomZbir;
                //alert(mealsArr_LS_3[i].zbir);

                mealsArr_LS_3[i].suma++;   
                //alert(mealsArr_LS_3[i].suma);
                //alert(mealsArr_LS_3[i].id);
                
                //dodamo ocenu:
                mealsArr_LS_3[i].ocene.push(parseInt(ocena));

                mealsArr_LS_3[i].ocene_usernames.push(username_curr);
                
                localStorage.setItem('meals', JSON.stringify(mealsArr_LS_3));

                break;
            }
        }
    });

    $("#preuzmiPdf").click(function() {
        //alert(recept.ime);
        //recept_solo
        
        var doc = new jsPDF();
        let ispis = recept.ime.replace(/ž/g ,"z").replace(/š/g ,"s").replace(/ć/g ,"c").replace(/č/g,"c").replace(/đ/g ,"dj");
        ispis += "\n\n" + recept.uputstvo.replace(/ž/g ,"z").replace(/š/g ,"s").replace(/ć/g ,"c").replace(/č/g,"c").replace(/đ/g ,"dj");

        doc.text(doc.splitTextToSize(ispis,200),6,16);  
        
        // var img = new Image();
        // img.crossOrigin = "anonymous";//dodao
        // img.src = recept.galerija;
        // doc.addImage(img, 'jpg', 10, 78, 12, 15);

        doc.save('recept.pdf');

    });


    $('#english').bind('click', function(){
        window.location.href = "z_soloRecept.html";
        return false;
    });

});