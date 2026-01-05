document.addEventListener("click", async (e) => {
    const deleteButton = e.target.closest(".delete-btn");
    if (!deleteButton) return;

    const bookingId = deleteButton.dataset.bookingId;
    console.log(deleteButton.dataset.bookingId);

    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
        const res = await fetch(`/deleteBooking/${bookingId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            deleteButton.closest("tr").remove();
        } else {
            alert("Delete failed");
        }
    } catch (err) {
        console.error(err);
    }
});