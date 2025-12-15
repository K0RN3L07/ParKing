//#region Dark Mode Toggle

function toggleDarkMode() {
    let button = document.getElementById("dark-mode-switch");
    // Enabling Dark Mode
    if (!document.body.classList.contains("darkmode")) {
        document.body.classList.add("darkmode");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';
    }

    // Disabling Dark Mode
    else {
        document.body.classList.remove("darkmode");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>'
    }
}

//#endregion

//#region Name Field Animation

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

//#endregion

//#region Email Field Animation

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

//#endregion

//#region Phone Number Field Animation

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

//#endregion

//#region Password Field Animation

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

//#endregion

//#region Password Again Field Animation

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

//#endregion

// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/;
// const notValidCharacters = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;

// let errorMessage = document.getElementById("errorMessage");

// // Checking Password For Regex
// function passwordSuitableForRegex() {
//     console.log(password.value)
//     console.log(passwordRegex.test(password.value))
//     if (!passwordRegex.test(password.value)) {
//         errorMessage.style["display"] = "block";
//         errorMessage.innerHTML += "A jelszónak legalább 8 karakterből kell állnia, és tartalmaznia kell nagybetűt, kisbetűt, számot és speciális karaktert! Nem tartalmazhat ékezetes karaktereket!";
//     }

//     else {
//         errorMessage.style["display"] = "none";
//         errorMessage.innerHTML = "";
//     }
// }

// // Check If Passwords Match
// function passwordMatchCheck() {
//     if (password.value != "" && passwordAgain.value != "") {
//         if (password.value !== passwordAgain.value) {
//             errorMessage.style.display = "block";
//             errorMessage.innerHTML += "A jelszavak nem egyeznek!";
//         }

//         else {
//             errorMessage.style.display = "none";
//             errorMessage.innerHTML = "";
//         }
//     }
// }

// password.addEventListener("input", passwordMatchCheck);
// password.addEventListener("input", passwordSuitableForRegex);
// passwordAgain.addEventListener("input", passwordMatchCheck);