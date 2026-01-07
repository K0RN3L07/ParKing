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
                deleteButton.closest("tr").remove();
                new CreatePopup("Sikeres törlés", true);
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