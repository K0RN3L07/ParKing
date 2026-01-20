let editEnabled = false;
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");
let cancelBtn = document.getElementById("cancelBtn");

let inputs = document.getElementsByTagName("input");

//#region Main EventListeners & Buttons

editBtn.addEventListener("click", () => {
    editEnabled = !editEnabled;

    editBtn.classList.toggle("hide");
    saveBtn.classList.toggle("hide");
    cancelBtn.classList.toggle("hide");

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

cancelBtn.addEventListener("click", () => {
    editEnabled = false;

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        input.disabled = true;
    }

    editBtn.classList.toggle("hide");
    saveBtn.classList.toggle("hide");
    cancelBtn.classList.toggle("hide");
});

const editProfileForm = document.getElementById("editProfileForm");

editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    //#region Validation 

    let name_input = document.getElementById("name_input");
    let email_input = document.getElementById("email_input");
    let phone_num_input = document.getElementById("phone_num_input");

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

        window.location.href = "/";
    }
    else {
        new CreatePopup(result.msg, result.success);
    }
});

//#endregion

