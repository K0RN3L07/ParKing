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