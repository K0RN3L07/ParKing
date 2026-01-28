//#region Name Field Animation

const fullname = document.getElementById("name");
const nameLabel = document.getElementById("nameLabel");

fullname.addEventListener("focusin", () => {
    nameLabel.style.transform = "translateY(-210%)";
});

fullname.addEventListener("focusout", () => {
    if (fullname.value != "") {
        nameLabel.style.transform = "translateY(-210%)";
    }

    else {
        nameLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Email Field Animation

const email = document.getElementById("email");
const emailLabel = document.getElementById("emailLabel");

email.addEventListener("focusin", () => {
    emailLabel.style.transform = "translateY(-210%)";
});

email.addEventListener("focusout", () => {
    if (email.value != "") {
        emailLabel.style.transform = "translateY(-210%)";
    }

    else {
        emailLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Phone Number Field Animation

const phoneNum = document.getElementById("phoneNum");
const phoneNumLabel = document.getElementById("phoneNumLabel");
phoneNum.value="";


phoneNum.addEventListener("focusin", () => {
    phoneNumLabel.style.transform = "translateY(-210%)";
});

phoneNum.addEventListener("focusout", () => {
    if (phoneNum.value != "") {
        phoneNumLabel.style.transform = "translateY(-210%)";
    }

    else {
        phoneNumLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Password Field Animation

const password = document.getElementById("password");
const passwordLabel = document.getElementById("passwordLabel");

password.addEventListener("focusin", () => {
    passwordLabel.style.transform = "translateY(-210%)";
});

password.addEventListener("focusout", () => {
    if (password.value != "") {
        passwordLabel.style.transform = "translateY(-210%)";
    }

    else {
        passwordLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Password Again Field Animation

const passwordAgain = document.getElementById("passwordAgain");
const passwordAgainLabel = document.getElementById("passwordAgainLabel");

passwordAgain.addEventListener("focusin", () => {
    passwordAgainLabel.style.transform = "translateY(-210%)";
});

passwordAgain.addEventListener("focusout", () => {
    if (passwordAgain.value != "") {
        passwordAgainLabel.style.transform = "translateY(-210%)";
    }

    else {
        passwordAgainLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion


//#region Show Password

let passwordToggleBtns = document.querySelectorAll("#passwordToggle");
let isPasswordShown = false;
let showSvg = document.querySelector(".showSvg");
let hideSvg = document.querySelector(".hideSvg");

passwordToggleBtns.forEach(passwordToggle => {
    passwordToggle.addEventListener("click", () => {
        isPasswordShown = !isPasswordShown;
        if (isPasswordShown) {
            password.type = "text";
            showSvg.classList.remove("hide");
            hideSvg.classList.add("hide");
        }
        else {
            password.type = "password";
            showSvg.classList.add("hide");
            hideSvg.classList.remove("hide");
        }
    });
});

let passwordAgainToggleBtns = document.querySelectorAll("#passwordAgainToggle");
let isPasswordAgainShown = false;
let showAgainSvg = document.querySelector(".showAgainSvg");
let hideAgainSvg = document.querySelector(".hideAgainSvg");

passwordAgainToggleBtns.forEach(passwordAgainToggle => {
    passwordAgainToggle.addEventListener("click", () => {
        isPasswordAgainShown = !isPasswordAgainShown;
        if (isPasswordAgainShown) {
            passwordAgain.type = "text";
            showAgainSvg.classList.remove("hide");
            hideAgainSvg.classList.add("hide");
        }
        else {
            passwordAgain.type = "password";
            showAgainSvg.classList.add("hide");
            hideAgainSvg.classList.remove("hide");
        }
    });
});

//#endregion

//#region Validation

const form = document.getElementById("registerForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault(); // stop form submit

    // Minimum length (8 characters)
    const lengthRegex = /^.{8,}$/;

    // At least one uppercase letter
    const uppercaseRegex = /[A-Z]/;

    // At least one lowercase letter
    const lowercaseRegex = /[a-z]/;

    // At least one number
    const numberRegex = /\d/;

    // At least one special character
    const specialCharRegex = /[^A-Za-z0-9]/;

    // No space character
    const noSpaceRegex = /^\S+$/;

    const aszf = document.getElementById("aszf").checked;

    // Simple email regex
    const emailRegex =
        /^(?!.*\.\.)(?!.*[^\x00-\x7F])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Hungarian character regex
    const hunCharRegex = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;

    // Phone number regex
    const phoneRegex = /^\d+$/;

    if (fullname.value === "") {
        new CreatePopup("A név megadása kötelező!", false);
        return;
    }

    if (!emailRegex.test(email.value)) {
        new CreatePopup("Érvénytelen email cím!", false);
        return;
    }

    if (phoneNum.value === "") {
        new CreatePopup("A telefonszám megadása kötelező!", false);
        return;
    }

    if (!phoneRegex.test(phoneNum.value)) {
        new CreatePopup("A telefonszám csak számot tartalmazhat!", false);
        return;
    }

    //#region Password Regex
    if (!uppercaseRegex.test(password.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 nagybetűs karakter!", false);
        return;
    }

    if (!lowercaseRegex.test(password.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 kisbetűs karakter!", false);
        return;
    }

    if (!numberRegex.test(password.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 számot!", false);
        return;
    }

    if (!specialCharRegex.test(password.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 speciális karakter!", false);
        return;
    }

    if (!noSpaceRegex.test(password.value)) {
        new CreatePopup("A jelszó nem tartalmazhat szóközt!", false);
        return;
    }

    if (hunCharRegex.test(password.value)) {
        new CreatePopup("A jelszó nem tartalmazhat ékezetes karaktereket!", false);
        return;
    }

    if (!lengthRegex.test(password.value)) {
        new CreatePopup("A jelszónak legalább 8 karakter hosszúnak kell lennie!", false);
        return;
    }
    //#endregion

    if (password.value !== passwordAgain.value) {
        new CreatePopup("A két jelszó nem egyezik!", false);
        return;
    }
    if (!aszf) {
        new CreatePopup("El kell fogadnia az ÁSZF-et és az Adatkezelési Szabályzatot!", false);
        return;
    }    

    const data = {
        name: fullname.value,
        email: email.value,
        phone_num: phoneNum.value,
        password: password.value
    };

    try {
        const res = await fetch("/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        new CreatePopup(result.msg, result.success);

        if (result.success) {
            sessionStorage.setItem("popupMsg", result.msg);
            sessionStorage.setItem("popupSuccess", result.success);

            window.location.href = "/login";
        }
        else {
            new CreatePopup(result.msg, result.success);
        }

    } catch (err) {
        console.error(err);
        new CreatePopup("Szerverhiba történt!", false);
    }
});

//#endregion

// Autofill fix
document.addEventListener("animationstart", (e) => {
    if (e.animationName === "onAutoFillStart") {
        const input = e.target;

        if (input === email) emailLabel.style.transform = "translateY(-210%)";
        if (input === password) passwordLabel.style.transform = "translateY(-210%)";
    }
});