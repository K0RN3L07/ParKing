//#region Parking Space Selector

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

//#endregion

//#region Level Selector

let levels = document.querySelectorAll('.circle');
let selectedIdx;

levels.forEach(level => {
    level.addEventListener("click", () => {
        selectedIdx = parseInt(level.innerHTML) - 1;
        levels.forEach(lvl => lvl.classList.remove("selected-level"));
            
        levels[selectedIdx].classList.add("selected-level");
    });
});


//#endregion