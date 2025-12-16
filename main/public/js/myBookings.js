document.addEventListener("click", async (e) => {
    const btn = e.target.closest(".delete-btn");
    if (!btn) return;

    const bookingId = btn.dataset.bookingId;

    if (!confirm("Are you sure you want to delete this booking?")) return;

    try {
        const res = await fetch(`/deleteBooking/${bookingId}`, {
            method: "DELETE"
        });

        if (res.ok) {
            btn.closest("tr").remove();
        } else {
            alert("Delete failed");
        }
    } catch (err) {
        console.error(err);
    }
});