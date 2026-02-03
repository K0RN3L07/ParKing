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

function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

let startDateInput = document.getElementById('start-date');
let startTimeInput = document.getElementById('start-time');
startDateInput.setAttribute("min", getCurrentDate());

let endDateInput = document.getElementById('end-date');
let endTimeInput = document.getElementById('end-time');
endDateInput.setAttribute("min", getCurrentDate());

startDateInput.addEventListener("input", () => {
    endDateInput.setAttribute("min", startDateInput.value);
})

endDateInput.addEventListener("input", () => {
    startDateInput.setAttribute("max", endDateInput.value);
})

// Check If Date & Time Inputs Are Filled
function checkIfDatesAreSet() {
    if (startDateInput.value && startTimeInput.value && endDateInput.value && endTimeInput.value) {
        return true;
    }
    return false;
}

let selectedSpotType = document.getElementById("selectedSpotType");


//#region Parking Space Selection

function checkCorrectDateInterval() {
    if (
        (startDateInput.value == endDateInput.value && endTimeInput.value < startTimeInput.value)
        || (startDateInput.value == getCurrentDate() && startTimeInput.value < getCurrentTime())
        || startDateInput.value > endDateInput.value) {
        return false
    }
    else {
        return true
    }
}

function isMoreThanOneYearAway() {
    let yearPlusOne = (parseInt(getCurrentDate().split('-')[0]) + 1).toString() + "-" + getCurrentDate().split('-')[1].toString() + "-" + getCurrentDate().split("-")[2].toString();
    return getAllDates()[2] > yearPlusOne;
}



radioArray.forEach(radio => {
    radio.addEventListener('change', () => {

        if (checkIfDatesAreSet()) {
            if (!checkCorrectDateInterval()) {
                new CreatePopup("Helytelen időintervallum!", false)
                radio.checked = false;
                resetValues()
            }
            else {
                if (isMoreThanOneYearAway(getCurrentDate(), getAllDates()[2])){
                    new CreatePopup("Nem lehet több mint egy évvel előre foglalni!", false)
                    radio.checked = false;
                    resetValues()
                }
                else{
                    
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
            }
        }

        else {
            new CreatePopup("Válaszd ki az időpontot először!", false);
            radio.checked = false;
        }
    });
});

//#endregion

//#region Delete Selected Space Button

let priceField = document.getElementById("price");
let typeField = document.getElementById("type");
let totalCost = document.getElementById("totalCost");

function resetValues(){
    radioArray.forEach(radio => {
        radio.checked = false;
    });

    // Update placeholder
    parkingSlotInput[0].setAttribute("value", `${selectedLevel}. emelet, `);
    priceField.value = "";
    typeField.value = "";
    totalCost.value = "";

    parkingSlotInputForBackend[0].setAttribute("value", `${selectedLevel};${null}`);
    deleteSelection.classList.remove("visible");
}

deleteSelection.addEventListener('click', () => {
    resetValues();
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
    let price = data["price_per_hour"] * parseInt(startedHoursBetween(getAllDates()[0], getAllDates()[1], getAllDates()[2], getAllDates()[3]))
    document.getElementById("totalCost").value = price + "Ft";
}

function startedHoursBetween(startDate, startTime, endDate, endTime) {
    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const msDiff = end - start; // difference in milliseconds
    const hours = msDiff / (1000 * 60 * 60);
    return Math.ceil(hours);
}

startDateInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        resetValues();
        allDatesSet = true;
        levels[0].click();
    }
});

startTimeInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        resetValues();
        allDatesSet = true;
        levels[0].click();
    }
});

endDateInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        resetValues();
        allDatesSet = true;
        levels[0].click();
    }
});

endTimeInput.addEventListener("input", () => {
    if (checkIfDatesAreSet()) {
        resetValues();
        allDatesSet = true;
        levels[0].click();
    }
});


//#endregion

//#region Level Selector

let levels = document.querySelectorAll('.circle');
let selectedIdx;

let allDatesSet = false;

// Adding Event Listeners
levels.forEach(level => {
    level.addEventListener("click", () => {
        if (allDatesSet) {
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
        if (allDatesSet) {
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
            new CreatePopup("Válaszd ki az időpontot először!", false)
        }
    });
});

//#endregion

// #region Book button

document.getElementById("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        try {
            if (checkCorrectDateInterval()) {
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
                    new CreatePopup(result.msg, result.success);
                }
            }
            else {
                resetValues()
                new CreatePopup("Helytelen időintervallum!", false);
            }

        }
        catch (err) {
            console.log(err);

            new CreatePopup(result.msg, result.success);
        }
    } catch (err) {
        console.error(err);
        new CreatePopup("Hiba történt a kapcsolat során", false);
    }
});

//#endregion