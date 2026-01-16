let editEnabled = false;
let editBtn = document.getElementById("editBtn");
let saveBtn = document.getElementById("saveBtn");
let cancelBtn = document.getElementById("cancelBtn");

let inputs = document.getElementsByTagName("input");

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

document.getElementById('saveBtn').addEventListener('click', async () => {
    const data = {
        name: document.getElementById('name_input').value,
        email: document.getElementById('email_input').value,
        phone_num: document.getElementById('phone_num_input').value
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