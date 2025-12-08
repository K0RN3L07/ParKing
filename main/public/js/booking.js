//#region Parking Space Selector

let radioArray = document.querySelectorAll('input[type="radio"]');
let deleteSelection = document.getElementById('deleteSelection');

let slotArray = document.querySelectorAll('input[type="radio"]');
let parkingSlotInput = document.getElementsByName('parking-slot');
let parkingSlotInputForBackend = document.getElementsByName('parking_slot');
let selectedSlot;
let selectedLevel = 1;

let startDateInput = document.getElementById('start-date');
let startTimeInput = document.getElementById('start-time');
let endDateInput = document.getElementById('end-date');
let endTimeInput = document.getElementById('end-time');

function checkIfDatesAreSet() {
    if (startDateInput.value && startTimeInput.value && endDateInput.value && endTimeInput.value) {
        return true;
    }
    else {
        return false;
    }
}

radioArray.forEach(radio => {
    radio.addEventListener('change', () => {

        if (checkIfDatesAreSet()) {
            if (radio.checked) {
                deleteSelection.classList.add("visible");
            }
            
            else {
                if (deleteSelection.classList.contains("visible")) {
                    deleteSelection.classList.remove("visible");
                }
            }
            
            
            // Update placeholder
            if (radio.checked) {
                selectedSlot = radio.id;
                parkingSlotInput[0].setAttribute("value", `${selectedLevel}. emelet, ${selectedSlot}. parkolóhely`);
                parkingSlotInputForBackend[0].setAttribute("value", `${selectedLevel};${selectedSlot}`);
            }
        }

        else {
            alert("A parkolóhely kiválasztásához előbb állítsd be a foglalás időtartamát!");
            radio.checked = false;
        }
    });
});

deleteSelection.addEventListener('click', () => {
    radioArray.forEach(radio => {
        radio.checked = false;
    });

    // Update placeholder
    parkingSlotInput[0].setAttribute("value", `${selectedLevel}. emelet, `);
    parkingSlotInputForBackend[0].setAttribute("value", `${selectedLevel};${null}`);
    deleteSelection.classList.remove("visible");
});

//#endregion

//#region Level Selector

let levels = document.querySelectorAll('.circle');
let selectedIdx;

levels.forEach(level => {
    level.addEventListener("click", () => {
        radioArray.forEach(radio => {
            radio.checked = false;
        });

        selectedIdx = parseInt(level.innerHTML) - 1;
        levels.forEach(lvl => lvl.classList.remove("selected-level"));

        levels[selectedIdx].classList.add("selected-level");


        // Update placeholder
        if (level.classList.contains("selected-level")) {
            selectedLevel = selectedIdx + 1;
        }

        parkingSlotInput[0].setAttribute("value", `${selectedLevel}. emelet, `);
        parkingSlotInputForBackend[0].setAttribute("value", `${selectedLevel};${null}`);
    });
});

document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', async () => {
        const floor = circle.textContent.trim();

        console.log("Clicked floor:", floor);

        try {
            const response = await fetch('/getAllReservedOnFloor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ parking_slot: floor })
            });

            const data = await response.json();
            console.log("Response:", data);

        } catch (err) {
            console.error("Fetch error:", err);
        }
    });
});

//#endregion