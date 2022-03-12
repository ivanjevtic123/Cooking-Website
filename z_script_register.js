$(document).ready(function() {
    
    $("#registerBtn").click(function() {
        localStorage.setItem("user", "");

        let name = $("#name").val();
        let surname = $("#surname").val();
        let username = $("#username").val();
        let email = $("#email").val();
        let password = $("#password").val();
        let passwordAgain = $("#passwordAgain").val();
        
        if(name == "" || surname == "" || username == "" || email == "" || password == "" || passwordAgain == "") {
            alert("Fill all fields!");
            return;
        }

        if(password != passwordAgain) {
            alert("Password and password again do not match!");
            return;
        }
        /*
        if(/^[a-zA-Z]\w*$/.test(username) == false) {
            alert("Korisnicko ime nije u dobrom formatu.");
            return;
        } else if(/^[a-zA-Z]\w*$/.test(surname) == false) { 
            alert("Prezime nije u dobrom formatu.");
            return;
        } else if(/^[a-zA-Z]\w*$/.test(name) == false) { 
            alert("Ime nije u dobrom formatu.");
            return;
        } else if(/^\w+@[a-z]+\.[a-z]{2,3}$/.test(email) == false) {
            alert("Mejl nije u dobrom formatu.");
            return;
        } else if(
            /^.{6,}$/.test(lozinka) == false ||
            /[a-z]/.test(lozinka) == false ||
            /[A-Z]/.test(lozinka) == false ||
            /\d/.test(lozinka) == false
        ) {
            alert("Lozinka nije u dobrom formatu.");
            return;
        }
        */
        let pronadjen = false;
        let allUsers_pom = JSON.parse(localStorage.getItem('allUsers'));
        for(let i = 0; i < allUsers_pom.length; i++) {
            if(allUsers_pom[i].username == username) {
                pronadjen = true;
            }
        }

        if(!pronadjen) {
            let new_user = {
                name : name, 
                surname : surname, 
                username : username, 
                email : email, 
                password : password
            };
            
            let allUsers_LS = JSON.parse(localStorage.getItem('allUsers'));
            allUsers_LS.push(new_user);
            localStorage.setItem('allUsers', JSON.stringify(allUsers_LS));
    
            localStorage.setItem("user", username);
            //localStorage.setItem("loggedIn", true);
    
            alert("You have registred successfully!");
            window.location.href = "z_index.html";
            return false;
        } else {
            alert("Username is not available!");
        }



    });


    $('#serbian').bind('click', function(){
        window.location.href = "register.html";
        return false;
    });



});