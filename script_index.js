$(document).ready(function() { 
    
    if(localStorage.getItem('user') == '') {
        alert("Niste ulogovani!");
        window.location.href = "login.html";
        return false;
    }

    let idMealGlobal;
    if(localStorage.getItem("idMeal") == null) {
        localStorage.setItem('idMeal', "0");
        idMealGlobal = 0;
    } else {
        idMealGlobal = parseInt(JSON.parse(localStorage.getItem('idMeal'))) + 1;
        //localStorage.setItem('idMeal', JSON.stringify(idMealGlobal)); //new max id
    }

    let initMealsArray = [
        {//DESERTI:
            id: 0,
            username: "pera",
            ime: "Cokoladna torta",
            grupa: "desert",
            uputstvo: "Ulupajte 5 belanaca u čvrst šam, dodajte 5 kašika šećera i miksajte dok se ne rastvori. Smanjite brzinu miksera i dodajte žumanca, pa sipajte 1 dl ulja u mlazu. Ručno umešajte 3 kašike brašna i 2 kašike kakaoa.",
            trajanje: 120,
            tezina: 3,
            komentari: ["Ukusno", "Najbolja ikad"],
            video: "videos/torta1.mp4",
            galerija: "images/desert/torta2.jpg",
            zbir: 9,
            suma: 2,
            ocene: [5, 4],
            komentari_usernames: ["pera", "ana"],
            ocene_usernames: ["pera", "sanja"]
        },
        {
            id: 1,
            username: "pera",
            ime: "Nutela torta",
            grupa: "desert",
            uputstvo: "Ulupajte 5 belanaca u čvrst šam, dodajte 5 kašika šećera i miksajte dok se ne rastvori. Smanjite brzinu miksera i dodajte žumanca, pa sipajte 1 dl ulja u mlazu. Ručno umešajte 3 kašike brašna i 2 kašike kakaoa.",
            trajanje: 220,
            tezina: 5,
            komentari: ["Ukusno", "Najbolja ikad", "Ne moze bolje"],
            video: "videos/torta1.mp4",
            galerija: "images/desert/torta1.jpg",
            zbir: 7,
            suma: 2,
            ocene: [4, 3],
            komentari_usernames: ["pera", "sanja", "jelena"],
            ocene_usernames: ["sanja" ,"pera"]
        },
        {
            id: 2,
            username: "pera",
            ime: "Kinder torta",
            grupa: "desert",
            uputstvo: "Ulupajte 5 belanaca u čvrst šam, dodajte 5 kašika šećera i miksajte dok se ne rastvori. Smanjite brzinu miksera i dodajte žumanca, pa sipajte 1 dl ulja u mlazu. Ručno umešajte 3 kašike brašna i 2 kašike kakaoa.",
            trajanje: 20,
            tezina: 1,
            komentari: ["Ukusno", "Najbolja ikad", "Ne moze bolje"],
            video: "videos/torta1.mp4",
            galerija: "images/desert/torta3.jpeg",
            zbir: 15,
            suma: 3,
            ocene: [5, 5, 5],
            komentari_usernames: ["jelena" ,"pera", "sanja"],
            ocene_usernames: ["jelena" ,"pera", "sanja"]
        },//PREDJELA:
        {
            id: 3,
            username: "jelena",
            ime: "Slani macaronsi",
            grupa: "predjelo",
            uputstvo: "Blanširane bademe usitnite u secku, te ih pomešajte sa šećerom u prahu. Ovu mešavinu ponovo sameljite u mlinu za kafu, dodajte i odabrane začine, a zatim je prosejte kroz sito i krupnije čestice vratite na još jedno usitnjavanje. Na kraju umešajte i boju u prahu, moj izbor je bila braon sa malo crvene i žute.",
            trajanje: 20,
            tezina: 5,
            komentari: ["Ukusno predjelo", "Brzo se pravi"],
            video: "videos/predjelo1.mp4",
            galerija: "images/predjelo/predjelo1.jpg",
            zbir: 7,
            suma: 2,
            ocene: [3, 4],
            komentari_usernames: ["sanja", "pera"],
            ocene_usernames: ["pera", "sanja"]
        },
        {
            id: 4,
            username: "pera",
            ime: "Ruska salata",
            grupa: "predjelo",
            uputstvo: "Osnovu savremenog izdanja čine kockice povrća i jaja spojeni majonezom, neko će majonez pripremiti sam, drugi će kupiti gotovu mešavinu povrća, neko dodaje limunov sok, drugi malo sirćeta, pojedini izostavljaju krompir ili jaja, dodaju meso iz supe i tako dalje. Mnogo varijacija na temu, i svaka je najbolja onome ko  je modifikovao i tako i treba biti. Jer dok se neki kruto drže tradicije drugi vole da eksperimentišu, a dok puštamo svakom na volju problema neće biti. Sukobi nastaju samo ako pokušamo da nametnemo svoj način kao jedini ispravan i pravi.",
            trajanje: 20,
            tezina: 4,
            komentari: ["Ukusno predjelo", "Brzo se pravi"],
            video: "videos/predjelo1.mp4",
            galerija: "images/predjelo/predjelo2.jpg",
            zbir: 7,
            suma: 2,
            ocene: [3, 4],
            komentari_usernames: ["pera", "sanja"],
            ocene_usernames: ["pera", "sanja"]
        },
        {
            id: 5,
            username: "jelena",
            ime: "Salata od kukuruza i luka",
            grupa: "predjelo",
            uputstvo: "Leti važi preporuka da se što manje zadržavamo u kuhinji, a što više na plaži il debelom hladu, već prema sklonostima i mogućnostima. Jedan od načina je da za ručak ispržimo na brzinu neki roštilj, ćufte il ribu i samo dodamo salatu. Obavezno neku sezonsku naravno, al i ovako neku univerzalnu.",
            trajanje: 20,
            tezina: 1,
            komentari: ["Ukusno predjelo", "Brzo se pravi"],
            video: "videos/predjelo1.mp4",
            galerija: "images/predjelo/predjelo3.jpg",
            zbir: 7,
            suma: 2,
            ocene: [2, 5],
            komentari_usernames: ["ana", "ana"],
            ocene_usernames: ["ana", "jelena"]
        },//GLAVNO JELO:
        {
            id: 6,
            username: "jelena",
            ime: "Zimski gulaš",
            grupa: "glavnoJelo",
            uputstvo: "Verujem da mnogi od vas imaju već svoj provereno dobar ako ne i najbolji recept za gulaš, a ovo je neki moj do kog sam došla vremenom prilagođavajući se prohtevima svoje porodice. Naime moji ne vole jake začine, alevu papriku,vino,a dok nisu svi dobili sve zube nisu mogli da sažvaću ni meso u komadima. Tako da sam ja sve što im se ne dopada izbacila, a dodala ono što mogu da pojedu sa zadovoljstvom ili bar bez negodovanja.",
            trajanje: 320,
            tezina: 5,
            komentari: ["Kvalitetan gulas"],
            video: "videos/glavno1.mp4",
            galerija: "images/glavnoJelo/glavno1.jpg",
            zbir: 5,
            suma: 1,
            ocene: [5],
            komentari_usernames: ["ana"],
            ocene_usernames: ["ana"]
        },
        {
            id: 7,
            username: "sanja",
            ime: "Musaka sa pirinčem",
            grupa: "glavnoJelo",
            uputstvo: "Musaka ima baš puno varijeteta i sasvim je izvesno da svako od nas ima svog favorita. Ova pred vama je meni omiljena. Premda je ukusom bogata i zasitna istovremeno je i jednostavna i lako se sprema, te je odličan  izbor za svakodnevni porodični ručak.",
            trajanje: 120,
            tezina: 3,
            komentari: ["Domace i dobro"],
            video: "videos/glavno1.mp4",
            galerija: "images/glavnoJelo/glavno2.jpg",
            zbir: 9,
            suma: 2,
            ocene: [4, 5],
            komentari_usernames: ["ana"],
            ocene_usernames: ["ana", "pera"]
        },
        {
            id: 8,
            username: "pera",
            ime: "Potaž od tikvica",
            grupa: "glavnoJelo",
            uputstvo: "Tikvice su većini omiljeno letnje povrće, a pošto su  lagane, ukusne i hranljive preporučuju se svima. Pripremaju se na sto načina, a jedan od definitivno najjednostvnijih i najbržih je upravo ovakav potaž. Služi se kao toplo predjelo, a uz odgovarajuće dodatke može da bude i samostalan obrok u dijetalnoj ishrani il hrono večera.Ne sadrži nijedan alergen, pa je bezbedan kod svih preosetljivosti na hranu. Ako već niste spremali, izvolte probajte.,",
            trajanje: 20,
            tezina: 2,
            komentari: ["Ukusno predjelo", "Brzo se pravi"],
            video: "videos/glavno1.mp4",
            galerija: "images/glavnoJelo/glavno3.jpg",
            zbir: 8,
            suma: 2,
            ocene: [4, 4],
            komentari_usernames: ["ana", "ana"],
            ocene_usernames: ["ana", "jelena"]
        },//UZINE:
        {
            id: 9,
            username: "jelena",
            ime: "Lepinjice",
            grupa: "uzina",
            uputstvo: "Ako volite lepinjice uz roštilj il s kajmakom il klot, a mislite da treba dosta umešnosti i vremena da ih sami napravite, recept koji sledi će vas razuveriti. Ne samo da postupak pripreme nije komplikovan nego će vam uspeti čak iako nikad ništa pre niste umesili, al ne verujte mi na reč.",
            trajanje: 20,
            tezina: 2,
            komentari: ["Ukusno i brzo", "Preukusno", "Kvalitetno"],
            video: "videos/uzina1.mp4",
            galerija: "images/uzina/uzina1.jpg",
            zbir: 10,
            suma: 3,
            ocene: [1, 5, 4],
            komentari_usernames: ["ana", "jelena", "sanja"],
            ocene_usernames: ["sanja", "ana", "jelena"]
        },
        {
            id: 10,
            username: "jelena",
            ime: "Mekike",
            grupa: "uzina",
            uputstvo: "Brze mekike ne zato što ne možemo da ih stignemo nego jer se brzo spremaju, bez čekanja da testo naraste, te su odličan izbor svaki put kad žurimo, a želimo da sebe i svoje ukućane obradujemo toplim i mekim zalogajem. Ako izbegavate prženje jer ne želite da jedete masno ne brinite – ove mekike ne upijaju masnoću već su lagane, a fine. Pa, izvolite..",
            trajanje: 120,
            tezina: 3,
            komentari: ["Domace i dobro"],
            video: "videos/uzina1.mp4",
            galerija: "images/uzina/uzina2.jpg",
            zbir: 14,
            suma: 3,
            ocene: [4, 5, 5],
            komentari_usernames: ["ana"],
            ocene_usernames: ["ana", "pera", "sanja"]
        },
        {
            id: 11,
            username: "pera",
            ime: "Pogačice sa vitaminom C",
            grupa: "uzina",
            uputstvo: "Pogačica ima raznih – sa sirom, sa čvarcima, sa salamom.. A da l ste probali neke vitaminske? Ove za koje recept upravo sledi su pripremljene uz pomoć vitamina C il po hemijskom sastavu askorbinske kiseline. I u tome je verovatno čitava fora jer se od davnina zna da kiselina doprinosi dizanju kvasnog testa, pa su nekad naše bake linule koju kap sirćeta kad im se žurilo da ispeku hleb il pogaču. A neko se eto mngo godina kasnije setio da upotrebi tableticu u tu svrhu. Mogu vam reći da je ova modernizacija veoma ukusna i da su pogačice pojedene još većom brzinom od one kojom su spremljene. Izvolte..",
            trajanje: 320,
            tezina: 4,
            komentari: ["Ukusna uzina", "Brzo se pravi"],
            video: "videos/uzina1.mp4",
            galerija: "images/uzina/uzina3.jpg",
            zbir: 10,
            suma: 2,
            ocene: [5, 5],
            komentari_usernames: ["ana", "ana"],
            ocene_usernames: ["ana", "jelena"]
        },

    ];


    if(localStorage.getItem('meals') == null) {
        localStorage.setItem('meals', JSON.stringify(initMealsArray));
    }


    //TOP 3:
    let mealsPom = JSON.parse(localStorage.getItem('meals'));
    mealsPom.sort(ocenaCompare);

    if(mealsPom == null) { //nema recepata:
        $("#recepti").append("<h2>"+"Nema dostupnih recepata"+"</h2>").append("<hr>")
    } else { //ima recepata:
        for(let i = 0; i < mealsPom.length && i < 3; i++) {
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
            ).append("<br>");
        }
    }


    function ocenaCompare(meal1, meal2) {
        let ocena1 = meal1.zbir / ((meal1.suma)==0 ? 1 : meal1.suma);
        let ocena2 = meal2.zbir / ((meal2.suma)==0 ? 1 : meal2.suma);
        if(ocena1 > ocena2) {
            return -1;
        }
        if(ocena1 < ocena2) {
            return 1;
        }
        return 0;
    }

    $('#english').bind('click', function(){
        window.location.href = "z_index.html";
        return false;
    });


});