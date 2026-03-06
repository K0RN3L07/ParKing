import { loadUsers } from './users.js'; // relative to renderer.js

function removeBgFromNavLinks() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(l => {
        l.classList.remove("bg-primary");
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('mainContent');
    const usersTab = document.getElementById('usersTab');
    const refreshButton = document.getElementById("refreshButton");

    usersTab.addEventListener('click', async () => {
        // Inject EJS HTML as plain HTML (template)
        const templateHtml = await fetch('./views/users.ejs').then(r => r.text());
        mainContent.innerHTML = templateHtml;

        removeBgFromNavLinks();
        usersTab.classList.add("bg-primary");

        // Now call the loadUsers function from users.js
        loadUsers();
    });

    refreshButton.addEventListener("click", () => {
        window.location.reload();
    });
});