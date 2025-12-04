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

window.addEventListener("resize", () => {
    if (window.innerWidth > 650) {
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