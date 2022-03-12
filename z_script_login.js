$(document).ready(function() {

    let initUsersArray = [
        {
            username: "pera",
            password: "pera123",
            name: "Petar",
            surname: "Petrovic",
            email: "pera@gmail.com",
            //komentari: [],
            //ocene: []
        },
        {
            username: "mika",
            password: "mika123",
            name: "Mika",
            surname: "Mikic",
            email: "mika@gmail.com",
            //komentari: [],
            //ocene: []
        },
        {
            username: "marko",
            password: "marko123",
            name: "Marko",
            surname: "Markovic",
            email: "marko@gmail.com",
            //komentari: [],
           // ocene: []
        },
        {
            username: "ana",
            password: "ana123",
            name: "Ana",
            surname: "Ankovic",
            email: "ana@gmail.com",
            //komentari: [],
            //ocene: []
        },
        {
            username: "sanja",
            password: "sanja123",
            name: "Sanja",
            surname: "Sanjic",
            email: "sanja@gmail.com",
            //komentari: [],
            //ocene: []
        },
        {
            username: "jelena",
            password: "jelena123",
            name: "Jelena",
            surname: "Jelenovic",
            email: "jelena@gmail.com",
            //komentari: [],
            //ocene: []
        }
    ];

    //init:
    if(localStorage.getItem('allUsers') == null) {
        localStorage.setItem('allUsers', JSON.stringify(initUsersArray));
    }
    
    $("#loginBtn").click(function() {
        //localStorage.setItem("loggedIn", false);
        localStorage.setItem("user", "");

        /*if(localStorage.getItem('allUsers') == null) {
            localStorage.setItem('allUsers', JSON.stringify(initUsersArray));
        }*/
        let allUsersLS = JSON.parse(localStorage.getItem('allUsers'));

        let username = $("#username").val();
        let password = $("#password").val();
        
        let pronadjen = false;
        let userCheck;
        for(let i = 0; i < allUsersLS.length; i++) {
            if(allUsersLS[i].username == username) {
                pronadjen = true;
                userCheck = allUsersLS[i];
                break;
            }
        }
        if(!pronadjen) {
            alert("User does not exist!");
            return;
        }

        if(username == "" || password == "") {
            alert("Fill all fields!");
            return;
        } else {
            if(password != userCheck.password) {
                alert("Wrong password!");
            } else {
                //localStorage.setItem("loggedIn", true);
                localStorage.setItem("user", username);
                alert("success");
                window.location.href = "z_index.html";
                return false;
            }
        }

        



    });



    $('#serbian').bind('click', function(){
        window.location.href = "login.html";
        return false;
    });


});