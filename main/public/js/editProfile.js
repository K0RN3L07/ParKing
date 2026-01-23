let editEnabled = false;
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");
let cancelBtn = document.getElementById("cancelBtn");
let editPasswordBtn = document.getElementById("editPasswordBtn");

let inputs = document.querySelectorAll(".profileDataInput");

let name_input = document.getElementById("name_input");
let email_input = document.getElementById("email_input");
let phone_num_input = document.getElementById("phone_num_input");

let currentName;
let currentEmail;
let currentPhoneNum;

//#region Main EventListeners & Buttons

editBtn.addEventListener("click", () => {
    editEnabled = !editEnabled;

    editBtn.classList.toggle("hide");
    saveBtn.classList.toggle("hide");
    cancelBtn.classList.toggle("hide");

    currentName = name_input.value;
    currentEmail = email_input.value;
    currentPhoneNum = phone_num_input.value;
    
    if (editEnabled) {
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.disabled = false;
        }
    }

    else {
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            input.disabled = true;
        }
    }
});

function setToDefaultView() {
    editEnabled = false;

    editBtn.classList.toggle("hide");
    saveBtn.classList.toggle("hide");
    cancelBtn.classList.toggle("hide");
    
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.disabled = true;
    }
}


cancelBtn.addEventListener("click", () => {
    setToDefaultView();

    name_input.value = currentName;
    email_input.value = currentEmail;
    phone_num_input.value = currentPhoneNum;
});

const editProfileForm = document.getElementById("editProfileForm");

editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //#region Validation 

    const emailRegex = /^(?!.*\.\.)(?!.*[^\x00-\x7F])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const phoneRegex = /^\d+$/;

    if (name_input.value === "") {
        new CreatePopup("A név mező nem lehet üres!", false);
        return;
    }

    if (!emailRegex.test(email_input.value)) {        
        new CreatePopup("Érvénytelen email cím!", false);
        return;
    }

    if (phone_num_input.value === "") {
        new CreatePopup("A telefonszám mező nem lehet üres!", false);
        return;
    }

    if (!phoneRegex.test(phone_num_input.value)) {
        new CreatePopup("A telefonszám csak számot tartalmazhat!", false);
        return;
    }

    //#endregion

    const data = {
        name: name_input.value,
        email: email_input.value,
        phone_num: phone_num_input.value
    };

    const res = await fetch('/editProfileData', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    const result = await res.json();
    
    if (result.success) {
        sessionStorage.setItem("popupMsg", result.msg);
        sessionStorage.setItem("popupSuccess", result.success);

        window.location.reload();
    }
    else {
        new CreatePopup(result.msg, result.success);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const msg = sessionStorage.getItem("popupMsg");
    const success = Boolean(sessionStorage.getItem("popupSuccess"));

    if (msg !== null && success !== null) {
        new CreatePopup(msg, success);
        sessionStorage.removeItem("popupMsg");
        sessionStorage.removeItem("popupSuccess");
    }
});


// Edit Password
let editPasswordContainer = document.getElementById("editPasswordContainer");
let cancelPasswordBtn = document.getElementById("cancelPasswordBtn");
let editPasswordForm = document.getElementById("editPasswordForm");

editPasswordBtn.addEventListener("click", () => {
    if (!editPasswordContainer.classList.contains("showBackgroundFilter")) {
        editPasswordContainer.classList.add("showBackgroundFilter");
    }
});

cancelPasswordBtn.addEventListener("click", () => {
    if (editPasswordContainer.classList.contains("showBackgroundFilter")) {
        editPasswordContainer.classList.remove("showBackgroundFilter")
    }
});

editPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let currentPassword = document.getElementById("currentPassword");
    let newPassword = document.getElementById("newPassword");
    let newPasswordAgain = document.getElementById("newPasswordAgain");

    //#region Password Regex

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

    // Hungarian character regex
    const hunCharRegex = /[áéíóöőúüűÁÉÍÓÖŐÚÜŰ]/;

    if (!uppercaseRegex.test(newPassword.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 nagybetűs karakter!", false);
        return;
    }

    if (!lowercaseRegex.test(newPassword.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 kisbetűs karakter!", false);
        return;
    }

    if (!numberRegex.test(newPassword.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 számot!", false);
        return;
    }

    if (!specialCharRegex.test(newPassword.value)) {
        new CreatePopup("A jelszónak tartalmaznia kell legalább 1 speciális karakter!", false);
        return;
    }

    if (!noSpaceRegex.test(newPassword.value)) {
        new CreatePopup("A jelszó nem tartalmazhat szóközt!", false);
        return;
    }

    if (hunCharRegex.test(newPassword.value)) {
        new CreatePopup("A jelszó nem tartalmazhat ékezetes karaktereket!", false);
        return;
    }

    if (!lengthRegex.test(newPassword.value)) {
        new CreatePopup("A jelszónak legalább 8 karakter hosszúnak kell lennie!", false);
        return;
    }
    //#endregion

    if (newPassword.value !== newPasswordAgain.value) {
        new CreatePopup("A két jelszó nem egyezik!", false);
        return;
    }

    // Fetch goes here 🔽


    if (editPasswordContainer.classList.contains("showBackgroundFilter")) {
        editPasswordContainer.classList.remove("showBackgroundFilter")
    }
});

//#endregion

