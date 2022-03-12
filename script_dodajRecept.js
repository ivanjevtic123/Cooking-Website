$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    $('input[type=file]').change(function () {
        var filePath=$('#fileUpload').val(); 
    });

    $("#addBtn").click(function() {
        //alert("kliknuo");
        let naziv = $("#name").val();
        let grupa = $("#grupa_input").val();
        let uputstvo = $("#uputstvo").val();
        let trajanje = $("#trajanje").val();
        let tezina = $("#tezina_input").val();
        let video = $("#videoInput").val();
        //let slika = $("#pictureSrc").val();
        let slika = $('#fileupload').val();
        //videos/uzina1.mp4
        let s_pom = slika.split("\\");
        let s_konacno = "dodato/" + s_pom[2];

        let v_pom = video.split("\\");
        let v_konacno = "dodato/" + v_pom[2];
       
        

        if(naziv == '' || grupa == '' || uputstvo == '' || trajanje == '' || tezina == '' || video == '' || slika == '') 
        {
            alert("Unesite sve podatke!");
            return;
        } else {
            let mealsArr_LS = JSON.parse(localStorage.getItem('meals'));
            //alert(mealsArr_LS[mealsArr_LS.length - 1].id);

            let newId = mealsArr_LS[mealsArr_LS.length - 1].id;
            //alert(mealsArr_LS[mealsArr_LS.length - 1].id);
            newId++;

            let username_curr = localStorage.getItem('user');

            let newMeal = {
                id: newId,
                username: username_curr,
                ime: naziv,
                grupa: grupa,
                uputstvo: uputstvo,
                trajanje: trajanje,
                tezina: tezina,
                komentari: [],
                video: v_konacno,//video,
                galerija: s_konacno,//slika,
                zbir: 0,
                suma: 0,
                ocene: [],
                komentari_usernames: [],
                ocene_usernames: []
            };
            //alert(newMeal.ime);

            mealsArr_LS.push(newMeal);

            localStorage.setItem('meals', JSON.stringify(mealsArr_LS));
        }


    });

   


    $('#english').bind('click', function(){
        window.location.href = "z_eng_dodajRecept.html";
        return false;
    });



});