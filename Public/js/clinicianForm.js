var badUsername, badPassword, badRepeatPassword;

//this is a client-side check, as we don't care if there are duplicate usernames or people, etc. This should be changed
//for proper release
function validateForm(form) {
    //setup neccessary vars to keep track of
    var username, password;
    var nameRegex = /^[a-zA-Z0-9]{3,16}$/;
    var passwordRegex = /^(?=.*\d).{6,16}$/;
    var isBad = false;
    
    //cleanup the elements that no longer need to exist.
    if(typeof badUsername != "undefined") {
        badUsername.parentNode.removeChild(badUsername);
    }
    if(typeof badPassword != "undefined") {
        badPassword.parentNode.removeChild(badPassword);
    }
    if(typeof badRepeatPassword != "undefined") {
        badRepeatPassword.parentNode.removeChild(badRepeatPassword);
    }

    //get the rows of the form
    var rows = form.getElementsByClassName("row");

    //check each row for fields (labels)
    for(i = 0; i < rows.length; i++) {
        var row = rows[i];

        //get the labels of this row
        var inputs = row.getElementsByTagName("input");
        for(j = 0; j < inputs.length; j++) {
            var input = inputs[j];
            switch(input.name) {
                case "username":
                    console.log(input);
                    username = input.value;
                    console.log(username);
                    var validUsername = username.trim().match(nameRegex);

                    //if we have a bad username
                    if(validUsername === null) {
                        badUsername = document.createElement("div");
                        row.appendChild(badUsername);
                        badUsername.textContent = "Your Username must not have any special characters that are not \"-\" and be between 3-16 letters long.";

                        isBad = true;
                    }
                    break;
                case "password":
                    password = input.value;
                    var validPassword = password.trim().match(passwordRegex);

                    if(validPassword === null) {
                        badPassword = document.createElement("div");
                        row.appendChild(badPassword);
                        badPassword.textContent = "Your password must be at least 6 letters long, max 16 and contain at least one number";

                        isBad = true;
                    }
                    break;
                case "confirm_password":
                    if(password != input.value) {
                        badRepeatPassword = document.createElement("div");
                        row.appendChild(badRepeatPassword);
                        badRepeatPassword.textContent = "This does not match the chosen password";

                        isBad = true;
                    }
                    break;
                default:
                break;
            };
        };

        if(!isBad) {
            form.submit();
        }
    };
}