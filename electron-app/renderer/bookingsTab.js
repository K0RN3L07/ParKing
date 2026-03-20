export async function loadAllBookings() {
    const bookings = await window.api.getAllBookings(); // IPC call
    const table = document.getElementById("bookingsTable");
    table.innerHTML = "";

    bookings.forEach(booking => {
        const date = new Date(booking.booked_at);
        const formattedDate =
            date.getFullYear() + ". " +
            String(date.getMonth() + 1).padStart(2, "0") + ". " +
            String(date.getDate()).padStart(2, "0") + ". " +
            String(date.getHours()).padStart(2, "0") + ":" +
            String(date.getMinutes()).padStart(2, "0");

        const date1 = new Date(booking["start_time"]);
        const start_formatted = date1.toLocaleString("hu-HU", {
            year: "numeric", month: "2-digit",
            day: "2-digit", hour: "2-digit", minute: "2-digit"
        });

        const date2 = new Date(booking["end_time"]);
        const end_formatted = date2.toLocaleString("hu-HU", {
            year: "numeric", month: "2-digit",
            day: "2-digit", hour: "2-digit", minute: "2-digit"
        });

        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.plate_num}</td>
                <td>${booking.parking_num}</td>
                <td>${start_formatted}</td>
                <td>${end_formatted}</td>
                <td>${booking.parking_status}</td>
                <td>${booking.payment_status}</td>
                <td>${booking.total_price}Ft</td>
                <td>${formattedDate}</td>
                <td class='text-center' style='min-width:115px'>
                    <button class="btn btn-md btn-dark me-2 text-primary accept-btn"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-md btn-dark text-danger decline-btn"><i class="bi bi-trash3-fill"></i></button>
                </td>
            `;
        table.appendChild(row);
    });
}
