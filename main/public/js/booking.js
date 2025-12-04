let radioArray = document.querySelectorAll('input[type="radio"]');
let deleteSelection = document.getElementById('deleteSelection');

radioArray.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            deleteSelection.classList.add("visible");
        }

        else {
            if (deleteSelection.classList.contains("visible")) {
                deleteSelection.classList.remove("visible");
            }
        }
    });
});

deleteSelection.addEventListener('click', () => {
    radioArray.forEach(radio => {
        radio.checked = false;
    });
    deleteSelection.classList.remove("visible");
});