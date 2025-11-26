let fullname = document.getElementById("name");
let nameLabel = document.getElementById("nameLabel");

fullname.addEventListener("focusin", () => {
    nameLabel.style.transform = "translateY(-250%)";
})

fullname.addEventListener("focusout", () => {
    if (fullname.value != "") {
        nameLabel.style.transform = "translateY(-250%)";
    }

    else {
        nameLabel.style.transform = "translateY(-110%)";
    }
})

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

let phoneNum = document.getElementById("phoneNum");
let phoneNumLabel = document.getElementById("phoneNumLabel");

phoneNum.addEventListener("focusin", () => {
    phoneNumLabel.style.transform = "translateY(-250%)";
})

phoneNum.addEventListener("focusout", () => {
    if (phoneNum.value != "") {
        phoneNumLabel.style.transform = "translateY(-250%)";
    }

    else {
        phoneNumLabel.style.transform = "translateY(-110%)";
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

let passwordAgain = document.getElementById("passwordAgain");
let passwordAgainLabel = document.getElementById("passwordAgainLabel");

passwordAgain.addEventListener("focusin", () => {
    passwordAgainLabel.style.transform = "translateY(-250%)";
})

passwordAgain.addEventListener("focusout", () => {
    if (passwordAgain.value != "") {
        passwordAgainLabel.style.transform = "translateY(-250%)";
    }
    
    else {
        passwordAgainLabel.style.transform = "translateY(-110%)";
    }
})