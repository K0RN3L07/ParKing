// Function to load users into the table
export async function loadUsers() {
    const users = await window.api.getUsers(); // IPC call
    const table = document.getElementById("userTable");
    table.innerHTML = "";

    users.forEach(user => {
        const date = new Date(user.registered_at);
        const formattedDate =
            date.getFullYear() + ". " +
            String(date.getMonth() + 1).padStart(2, "0") + ". " +
            String(date.getDate()).padStart(2, "0") + ". " +
            String(date.getHours()).padStart(2, "0") + ":" +
            String(date.getMinutes()).padStart(2, "0");

        // Create table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone_num}</td>
            <td class='text-truncate' style='max-width:100px;'>${user.password}</td>
            <td>${formattedDate}</td>
            <td class='text-center' style='min-width:115px'>
                <button class="btn btn-md btn-dark me-2 text-primary">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-md btn-dark text-danger popover-btn" data-id="${user.id}">
                    <i class="bi bi-trash3-fill"></i>
                </button>
            </td>
        `;
        table.appendChild(row);

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
                    <button class="btn btn-sm btn-success me-2 text-light accept-btn-user" data-id="${user.id}">Igen</button>
                    <button class="btn btn-sm btn-danger text-light decline-btn-user">Mégsem</button>
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

            const acceptBtn = popover.querySelector('.accept-btn-user');
            const declineBtn = popover.querySelector('.decline-btn-user');

            acceptBtn?.addEventListener('click', () => {
                const id = deleteBtn.dataset.id;
                console.log("Accepted delete user with ID:", id);

                // Close popover
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();

                // Optional: call IPC to delete user in database
                // window.api.deleteUser(id);
            });

            declineBtn?.addEventListener('click', () => {
                alert("Declined!");
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();
            });
        });
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