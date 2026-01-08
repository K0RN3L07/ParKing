//#region Name Field Animation

let fullname = document.getElementById("name");
let nameLabel = document.getElementById("nameLabel");

fullname.addEventListener("focusin", () => {
    nameLabel.style.transform = "translateY(-250%)";
});

fullname.addEventListener("focusout", () => {
    if (fullname.value != "") {
        nameLabel.style.transform = "translateY(-250%)";
    }

    else {
        nameLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Email Field Animation

let email = document.getElementById("email");
let emailLabel = document.getElementById("emailLabel");

email.addEventListener("focusin", () => {
    emailLabel.style.transform = "translateY(-250%)";
});

email.addEventListener("focusout", () => {
    if (email.value != "") {
        emailLabel.style.transform = "translateY(-250%)";
    }

    else {
        emailLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Phone Number Field Animation

let phoneNum = document.getElementById("phoneNum");
let phoneNumLabel = document.getElementById("phoneNumLabel");

phoneNum.addEventListener("focusin", () => {
    phoneNumLabel.style.transform = "translateY(-250%)";
});

phoneNum.addEventListener("focusout", () => {
    if (phoneNum.value != "") {
        phoneNumLabel.style.transform = "translateY(-250%)";
    }

    else {
        phoneNumLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Password Field Animation

let password = document.getElementById("password");
let passwordLabel = document.getElementById("passwordLabel");

password.addEventListener("focusin", () => {
    passwordLabel.style.transform = "translateY(-250%)";
});

password.addEventListener("focusout", () => {
    if (password.value != "") {
        passwordLabel.style.transform = "translateY(-250%)";
    }

    else {
        passwordLabel.style.transform = "translateY(-110%)";
    }
});

//#endregion

//#region Password Again Field Animation

let passwordAgain = document.getElementById("passwordAgain");
let passwordAgainLabel = document.getElementById("passwordAgainLabel");

passwordAgain.addEventListener("focusin", () => {
    passwordAgainLabel.style.transform = "translateY(-250%)";
});

passwordAgain.addEventListener("focusout", () => {
    if (passwordAgain.value != "") {
        passwordAgainLabel.style.transform = "translateY(-250%)";
    }

    else {
        passwordAgainLabel.style.transform = "translateY(-110%)";
    }
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

            window.location.href = "/";
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