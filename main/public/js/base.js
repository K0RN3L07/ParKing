// #region Dark Mode Toggle

function toggleDarkMode() {
    let button = document.getElementById("dark-mode-switch");
    // Enabling Dark Mode
    if (!document.body.classList.contains("darkmode")) {
        document.body.classList.add("darkmode");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';
    }

    // Disabling Dark Mode
    else {
        document.body.classList.remove("darkmode");
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';
    }
}

// Setting Theme Same As System Theme
function setThemeSameAsSystemTheme() {
    let button = document.getElementById("dark-mode-switch");
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('darkmode');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/></svg>';
    } else {
        document.body.classList.remove('darkmode');
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/></svg>';
    }
}

setThemeSameAsSystemTheme();

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeSameAsSystemTheme);

//#endregion

//#region Profile Icon Dropdown

let profileIconDropdownToggled = false;
let profileIcon = document.querySelector(".profile-icon");
let profileIconDropdownContainer = document.querySelector(".profile-icon-dropdown-container");

//Adding class to the dropdown to open and close it
function openProfileIconDropdown() {
    profileIconDropdownToggled = true;
    profileIcon?.classList.add('open');
    profileIconDropdownContainer?.classList.add('open');
}

function closeProfileIconDropdown() {
    profileIconDropdownToggled = false;
    profileIcon?.classList.remove('open');
    profileIconDropdownContainer?.classList.remove('open');
}

// Main toggling function
function toggleProfileIconDropdown(e) {
    if (e && e.stopPropagation) e.stopPropagation();
    profileIconDropdownToggled ? closeProfileIconDropdown() : openProfileIconDropdown();
}

profileIcon?.addEventListener('click', toggleProfileIconDropdown);

// Clicking inside the dropdown prevents it from closing
profileIconDropdownContainer?.addEventListener('click', (e) => e.stopPropagation());

// Clicking outside the dropdown closes it
document.addEventListener('click', () => {
    if (profileIconDropdownToggled) closeProfileIconDropdown();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileIconDropdownToggled) closeProfileIconDropdown();
});

//#endregion

//#region Hamburger Menu

let hamburgerBtn = document.querySelector(".hamburger-menu");
let hamburgerToggled = false;
let itemsVertical = document.getElementsByClassName("items-vertical");

// Main Toggling Function
function toggleHamburgerMenu() {
    hamburgerToggled = !hamburgerToggled;
    if (hamburgerToggled) {
        hamburgerBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='var(--base-color)'><path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z'/></svg>";
        itemsVertical[0].style.transform = "translateX(0%)";
    }

    else {
        hamburgerBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='var(--base-color)'><path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z'/></svg>";
        itemsVertical[0].style.transform = "translateX(100%)";

        dropdownToggled = false;
        dropdownIcon.style.rotate = "0deg";
        dropdownContainer.style.display = "none";
    }
}

// Closing it on resize
window.addEventListener("resize", () => {
    if (window.innerWidth > 690) {
        hamburgerToggled = false;
        hamburgerBtn.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='var(--base-color)'><path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z'/></svg>";
        itemsVertical[0].style.transform = "translateX(100%)";

        dropdownToggled = false;
        dropdownIcon.style.rotate = "0deg";
        dropdownContainer.style.display = "none";
    }
});

//#endregion

//#region My Profile Dropdown


let dropdownToggled = false;
let dropdownIcon = document.getElementById("dropdown-icon");
let dropdownContainer = document.querySelector(".profile-dropdown-conatiner");

// Main Toggling Function
function toggleProfileDropdown() {
    dropdownToggled = !dropdownToggled;
    if (dropdownToggled) {
        dropdownIcon.style.rotate = "180deg";
        dropdownContainer.style.display = "flex";
    }

    else {
        dropdownIcon.style.rotate = "0deg";
        dropdownContainer.style.display = "none";
    }
}

//#endregion

//#region Popup

class CreatePopup {

    timerDiv = document.createElement("div");

    constructor(msg, success) {
        let popupContainer = document.createElement("div");
        popupContainer.setAttribute("class", "popupContainer");

        let icon = document.createElement("img");
        let message = document.createElement("span");

        let closeBtn = document.createElement("div");
        closeBtn.setAttribute("id", "closeBtn");
        closeBtn.setAttribute("onclick", "closePopup()");
        closeBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="24"
             height="24"
             viewBox="0 -960 960 960"
             fill="var(--primary-text-color)">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
        </svg>
        `;

        this.timerDiv.setAttribute("id", "timerDiv");

        if (typeof success === "boolean" && success) {
            icon.setAttribute("src", "/img/success.png");
        }

        else {
            icon.setAttribute("src", "/img/error.png");
        }

        if (typeof msg === "string" && msg) {
            message.innerHTML = msg;
        }

        else {
            console.log("Nem megfelelő típus")
        }

        // Adding elements
        popupContainer.appendChild(icon);
        popupContainer.appendChild(message);
        popupContainer.appendChild(closeBtn);
        popupContainer.appendChild(this.timerDiv);
        document.body.appendChild(popupContainer);

        setTimeout(() => {
            popupContainer.classList.add("showPopup");
        }, 100);

        this.setTimer();
    }

    setTimer() {
        let timerMs = 10000;
        let countdown = setInterval(() => {
            timerMs -= 10;
            this.timerDiv.style.width = `${timerMs / 100}%`;

            if (timerMs <= 0) {
                clearInterval(countdown);
                this.closePopup();
            }
        }, 1);
    }

    closePopup() {
        let popup = document.getElementsByClassName("popupContainer");
        popup[0].classList.remove("showPopup")
        setTimeout(() => {
            document.body.removeChild(popup[0]);
        }, 300);
    }
}


function createConfirmationPopup(msg) {
    return new Promise((resolve) => {
        let backgroundFilter = document.createElement("div");
        backgroundFilter.className = "backgroundFilter showBackgroundFilter";

        let confirmationPopupContainer = document.createElement("div");
        confirmationPopupContainer.className = "confirmationPopupContainer";

        let message = document.createElement("span");
        message.innerHTML = typeof msg === "string" && msg ? msg : "Hiba";

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "buttonContainer";

        let yesButton = document.createElement("button");
        yesButton.className = "btn yesButton";
        yesButton.innerHTML = "Igen";

        let cancelButton = document.createElement("button");
        cancelButton.className = "btn cancelButton";
        cancelButton.innerHTML = "Mégse";

        // ✔ Button handlers
        yesButton.addEventListener("click", () => {
            cleanup();
            resolve(true);
        });

        cancelButton.addEventListener("click", () => {
            cleanup();
            resolve(false);
        });

        function cleanup() {
            backgroundFilter.remove();
        }

        confirmationPopupContainer.appendChild(message);
        buttonContainer.appendChild(yesButton);
        buttonContainer.appendChild(cancelButton);
        confirmationPopupContainer.appendChild(buttonContainer);
        backgroundFilter.appendChild(confirmationPopupContainer);
        document.body.appendChild(backgroundFilter);
    });
}

function createOKPopup(msg) {
    return new Promise((resolve) => {
        let backgroundFilter = document.createElement("div");
        backgroundFilter.className = "backgroundFilter showBackgroundFilter";

        let confirmationPopupContainer = document.createElement("div");
        confirmationPopupContainer.className = "confirmationPopupContainer";

        let message = document.createElement("span");
        message.innerHTML = typeof msg === "string" && msg ? msg : "Hiba";

        let buttonContainer = document.createElement("div");
        buttonContainer.className = "buttonContainer";

        let yesButton = document.createElement("button");
        yesButton.className = "btn yesButton";
        yesButton.innerHTML = "Ok"

        // ✔ Button handlers
        yesButton.addEventListener("click", () => {
            cleanup();
            resolve(true);
        });


        function cleanup() {
            backgroundFilter.remove();
        }

        confirmationPopupContainer.appendChild(message);
        buttonContainer.appendChild(yesButton);
        confirmationPopupContainer.appendChild(buttonContainer);
        backgroundFilter.appendChild(confirmationPopupContainer);
        document.body.appendChild(backgroundFilter);
    });
}

//#endregion


document.addEventListener("DOMContentLoaded", () => {
    const msg = sessionStorage.getItem("popupMsg");
    const success = sessionStorage.getItem("popupSuccess");

    if (msg !== null && success !== null) {
        console.log(success);
        
        new CreatePopup(msg, !success);
        sessionStorage.removeItem("popupMsg");
        sessionStorage.removeItem("popupSuccess");
    }
});