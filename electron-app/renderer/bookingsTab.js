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
                    <button class="btn btn-md btn-dark me-2 text-primary edit-btn" data-id="${booking.id}" data-parking-id="${booking.parking_space_id}"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-md btn-dark text-danger popover-btn" data-id="${booking.id}"><i class="bi bi-trash3-fill"></i></button>
                </td>
            `;
        table.appendChild(row);

        //#region Delete
        // Select delete button
        const deleteBtn = row.querySelector('.popover-btn');

        // Initialize popover for this button
        new bootstrap.Popover(deleteBtn, {
            html: true,
            sanitize: false,
            trigger: 'click',
            placement: 'right',
            customClass: 'popover-dark',
            content: `
                <div class='text-light'>
                    <p class='h6'>Biztosan törli?</p>
                    <button class="btn btn-sm btn-success me-2 text-light accept-btn-booking" data-id="${booking.id}">Igen</button>
                    <button class="btn btn-sm btn-danger text-light decline-btn-booking">Mégsem</button>
                </div>
            `
        });

        // Only one popover is open at a time
        deleteBtn.addEventListener('click', () => {
            document.querySelectorAll('.popover-btn').forEach(otherBtn => {
                if (otherBtn !== deleteBtn) {
                    const instance = bootstrap.Popover.getInstance(otherBtn);
                    if (instance) instance.hide();
                }
            });
        });

        // Bind Accept / Decline after popover is shown
        deleteBtn.addEventListener('shown.bs.popover', () => {
            const popoverId = deleteBtn.getAttribute('aria-describedby');
            const popover = document.getElementById(popoverId);
            if (!popover) return;

            const acceptBtn = popover.querySelector('.accept-btn-booking');
            const declineBtn = popover.querySelector('.decline-btn-booking');

            acceptBtn?.addEventListener('click', async () => {
                const id = deleteBtn.dataset.id;
                // console.log("Accepted delete booking with ID:", id);

                // Close popover
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();

                // Optional: call IPC to delete booking in database
                await window.api.deleteBooking(id);

                await loadAllBookings();
            });

            declineBtn?.addEventListener('click', () => {
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();
            });
        });
        //#endregion
    });

    const modalEl = document.getElementById('editBookingModal');
    const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

    let currentBookingId = null;
    let currentParkingId = null;

    // Open Modal
    table.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        if (!editBtn) return;

        const id = editBtn.dataset.id;
        const parkingId = editBtn.dataset.parkingId;

        const booking = bookings.find(b => b.id == id);
        if (!booking) return;

        currentBookingId = id;
        currentParkingId = parkingId;

        // Fill inputs
        document.getElementById('plateNum').value = booking.plate_num;
        document.getElementById('floorNum').value = booking.floor_num;
        document.getElementById('parkingSpaceNum').value = booking.parking_space_num;

        modal.show();
    });


    document.getElementById("saveChangesBtn").addEventListener("click", async () => {

        const plateNum = document.getElementById('plateNum').value;
        const floorNum = document.getElementById('floorNum').value;
        const parkingSpaceNum = document.getElementById('parkingSpaceNum').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        await window.api.editBooking(
            parseInt(currentBookingId),
            plateNum,
            startDate,
            endDate,
            currentParkingId
        );

        modal.hide();

        await loadAllBookings();
    });

    // Close popovers when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.popover') && !e.target.closest('.popover-btn')) {
            document.querySelectorAll('.popover-btn').forEach(btn => {
                const instance = bootstrap.Popover.getInstance(btn);
                if (instance) instance.hide();
            });
        }
    });
}