let editEnabled = false;
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");
let cancelBtn = document.getElementById("cancelBtn");

let inputs = document.getElementsByTagName("input");

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

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.disabled = true;
    }

    editBtn.classList.toggle("hide");
    saveBtn.classList.toggle("hide");
    cancelBtn.classList.toggle("hide");
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

//#endregion

