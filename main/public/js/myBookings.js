document.addEventListener("click", async (e) => {
    const deleteButton = e.target.closest(".delete-btn");
    if (!deleteButton) return;

    const bookingId = deleteButton.dataset.bookingId;

    const confirmed = await createConfirmationPopup("Biztosan törölni szeretnéd?");

    if (confirmed) {
        try {
            const res = await fetch(`/deleteBooking/${bookingId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                let rows = document.getElementsByTagName("tr");
                if (rows.length == 2) {
                    sessionStorage.setItem("popupMsg", "Sikeres törlés!");
                    sessionStorage.setItem("popupSuccess", true);
                    window.location.reload();
                }
                else {
                    deleteButton.closest("tr").remove();
                    new CreatePopup("Sikeres törlés", true);
                }
            } else {
                new CreatePopup("Sikertelen törlés", false);
            }
        } catch (err) {
            console.error(err);
        }
    } else {
        return;
    }
});

let details = document.getElementById("details");
let detailLabel = document.getElementById("detailLabel");

details.addEventListener("change", () => {
    if (details.checked) {
        detailLabel.innerHTML = "Részletek elrejtése";
    }
    else {
        detailLabel.innerHTML = "Részletek megjelenítése";
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const msg = sessionStorage.getItem("popupMsg");
    const success = Boolean(sessionStorage.getItem("popupSuccess"));

    if (msg !== null && success !== null) {
        new CreatePopup(msg, success);
        sessionStorage.removeItem("popupMsg");
        sessionStorage.removeItem("popupSuccess");
    }
});