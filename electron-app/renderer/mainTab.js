export async function loadUserCount() {
    const count = await window.api.getUserCount();
    const asd = document.getElementById("asd");

    asd.innerHTML = count;
}