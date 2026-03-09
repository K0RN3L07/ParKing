import { loadUserCount } from './mainTab.js'; // relative to renderer.js
import { loadUsers } from './usersTab.js';
import { loadAllBookings } from './bookingsTab.js';
import { loadAllParkingSpaces } from './parkingSpaces.js';

function removeBgFromNavLinks() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(l => {
        l.classList.remove("bg-primary");
    });
}

const mainContent = document.getElementById("mainContent");

async function loadMainTab() {
    // Inject EJS HTML as plain HTML (template)
    const templateHtml = await fetch('./views/mainTab.ejs').then(r => r.text());
    mainContent.innerHTML = templateHtml;

    removeBgFromNavLinks();
    mainTab.classList.add("bg-primary");

    // Now call the loadUsers function from users.js
    loadUserCount();
}

document.addEventListener('DOMContentLoaded', () => {
    loadMainTab();

    const mainTab = document.getElementById("mainTab");
    const usersTab = document.getElementById("usersTab");
    const bookingsTab = document.getElementById("bookingsTab");
    const parkingSpacesTab = document.getElementById("parkingSpacesTab");
    const refreshButton = document.getElementById("refreshButton");

    mainTab.addEventListener("click", loadMainTab);

    usersTab.addEventListener('click', async () => {
        const templateHtml = await fetch('./views/usersTab.ejs').then(r => r.text());
        mainContent.innerHTML = templateHtml;

        removeBgFromNavLinks();
        usersTab.classList.add("bg-primary");

        loadUsers();
    });

    bookingsTab.addEventListener("click", async () => {
        const templateHtml = await fetch('./views/bookingsTab.ejs').then(r => r.text());
        mainContent.innerHTML = templateHtml;

        removeBgFromNavLinks();
        bookingsTab.classList.add("bg-primary");

        loadAllBookings();
    })

    parkingSpacesTab.addEventListener("click", async () => {
        const templateHtml = await fetch("./views/parkingSpaces.ejs").then(r => r.text());
        mainContent.innerHTML = templateHtml;

        removeBgFromNavLinks();
        parkingSpacesTab.classList.add("bg-primary");

        loadAllParkingSpaces();
    })

    // Reload app
    refreshButton.addEventListener("click", () => {
        window.location.reload();
    });
});
