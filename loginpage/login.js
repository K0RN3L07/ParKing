let email = document.getElementById("email");
let emailLabel = document.getElementById("emailLabel");

email.addEventListener("focusin", () => {
    emailLabel.style.transform = "translateY(-250%)";
})

email.addEventListener("focusout", () => {
    if (email.value != "") {
        emailLabel.style.transform = "translateY(-250%)";
    }

    else {
        emailLabel.style.transform = "translateY(-110%)";
    }
})

let password = document.getElementById("password");
let passwordLabel = document.getElementById("passwordLabel");

password.addEventListener("focusin", () => {
    passwordLabel.style.transform = "translateY(-250%)";
})

password.addEventListener("focusout", () => {
    if (password.value != "") {
        passwordLabel.style.transform = "translateY(-250%)";
    }
    
    else {
        passwordLabel.style.transform = "translateY(-110%)";
    }
})