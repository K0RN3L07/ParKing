//#region Parking Space Selector

let radioArray = document.querySelectorAll('input[type="radio"]');
let deleteSelection = document.getElementById('deleteSelection');

let slotArray = document.querySelectorAll('input[type="radio"]');
let parkingSlotInput = document.getElementsByName('parking-slot');
let parkingSlotInputForBackend = document.getElementsByName('parking_slot');
let selectedSlot;
let selectedLevel = 1;

// Getting Current Date And Formatting It
function getCurrentDate() {
    return new Date().toISOString().split("T")[0];
}

let startDateInput = document.getElementById('start-date');
let startTimeInput = document.getElementById('start-time');

startDateInput.setAttribute("min", getCurrentDate());

let endDateInput = document.getElementById('end-date');
let endTimeInput = document.getElementById('end-time');

startDateInput.addEventListener("input", () => {
    endDateInput.setAttribute("min", startDateInput.value);
})

// Check If Date & Time Inputs Are Filled
function checkIfDatesAreSet() {
    if (startDateInput.value && startTimeInput.value && endDateInput.value && endTimeInput.value) {
        return true;
    }
    else {
        return false;
    }
}

let selectedSpotType = document.getElementById("selectedSpotType");


//#region Parking Space Selection

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
            getParkingSpaceTypeAndPrice(parkingSlotInputForBackend[0].getAttribute("value"));
        }

        else {
            alert("A parkolóhely kiválasztásához előbb állítsd be a foglalás időtartamát!");
            radio.checked = false;
        }
    });
});

//#endregion

//#region Delete Selected Space Button

let priceField = document.getElementById("price");
let typeField = document.getElementById("type");

deleteSelection.addEventListener('click', () => {
    radioArray.forEach(radio => {
        radio.checked = false;
    });

    // Update placeholder
    parkingSlotInput[0].setAttribute("value", `${selectedLevel}. emelet, `);
    priceField.value = "";
    typeField.value = "";
    console.log(typeField.value);
    
    parkingSlotInputForBackend[0].setAttribute("value", `${selectedLevel};${null}`);
    deleteSelection.classList.remove("visible");
});

//#endregion

let plateNum = document.getElementById("license");
let hiddenField = document.getElementById("hiddenField");


// Check If All Fields Are Filled
function checkIfAllBoxesFilled() {
    if (!checkIfDatesAreSet() || !plateNum.value || hiddenField.value.includes("null") || !hiddenField.value) {
        return false;
    }
    else {
        return true;
    }
}

function getAllDates() {
    start_date = document.getElementById("start-date").value;
    start_time = document.getElementById("start-time").value;
    end_date = document.getElementById("end-date").value;
    end_time = document.getElementById("end-time").value;
    return [start_date, start_time, end_date, end_time];
}

async function getParkingSpaceTypeAndPrice(parking_slot) {
    const response = await fetch('/getParkingSpaceTypeAndPrice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ parking_slot })
    });
    const text = await response.text();

    if (!text) {
        throw new Error("Empty response from server");
    }
    const data = JSON.parse(text);
    document.getElementById("type").value = data["type"]
    document.getElementById("price").value = data["price_per_hour"] + "Ft / óra"
}

startDateInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        searchButtonClicked = true;
        levels[0].click();
    }
});

startTimeInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        searchButtonClicked = true;
        levels[0].click();
    }
});

endDateInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        searchButtonClicked = true;
        levels[0].click();
    }
});

endTimeInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        searchButtonClicked = true;
        levels[0].click();
    }
});


//#endregion

//#region Level Selector

let levels = document.querySelectorAll('.circle');
let selectedIdx;

let searchButtonClicked = false;

// Adding Event Listeners
levels.forEach(level => {
    level.addEventListener("click", () => {
        if (searchButtonClicked) {
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
        }
    });
});

// Remove Reserved Spaces When Chaning Floor
let slots = document.querySelectorAll(".slot");
function removeReserved() {
    slots.forEach(item => {
        item.classList.remove("reserved");
    });
}

document.querySelectorAll('.circle').forEach(circle => {
    circle.addEventListener('click', async () => {
        if (searchButtonClicked) {
            removeReserved();
            const floor = circle.textContent.trim();

            try {
                const response = await fetch('/getAllReservedOnFloor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        parking_slot: floor,
                        start_date: getAllDates()[0],
                        start_time: getAllDates()[1],
                        end_date: getAllDates()[2],
                        end_time: getAllDates()[3]
                    })
                });

                const data = await response.json();

                for (let i = 0; i < data.reservedSpots.length; i++) {
                    slots[data.reservedSpots[i]["parking_space_num"] - 1].classList.add("reserved");
                }


            } catch (err) {
                console.log("Fetch error:", err);
            }
        }
        else {
            alert("Válaszd ki az időpontot először!");
        }
    });
});

//#endregion

// #region Book button

// bookButton.addEventListener("click", () => {
//     if (checkIfAllBoxesFilled()) {
//         bookButton.setAttribute("type", "submit");
//         confirm("Sikeres foglalás!");
//     }
//     else {
//         bookButton.setAttribute("type", "button");
//         alert("Minden mező kitöltése kötelező!");
//     }
// });

//#endregion


document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
        try{
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
    
            const response = await fetch("/bookSlot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await response.json();
    
            if (result.success) {
                const confirmed = await createOKPopup(result.msg);
                if (confirmed) {
                    window.location.href = "/myBookings";
                }
            }
            else {
                createPopup(result.msg, result.success);
            }
        }
        catch (err){
            console.log(err);
            
            createPopup(result.msg, result.success);
        }
    } catch (err) {
        console.error(err);
        createPopup("Hiba történt a kapcsolat során", false);
    }
});
