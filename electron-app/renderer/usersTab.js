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
                <button class="btn btn-md btn-dark me-2 text-primary edit-btn" data-id="${user.id}">
                    <i class="bi bi-pencil-fill"></i>
                </button>
                <button class="btn btn-md btn-dark text-danger popover-btn" data-id="${user.id}">
                    <i class="bi bi-trash3-fill"></i>
                </button>
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

            acceptBtn?.addEventListener('click', async () => {
                const id = deleteBtn.dataset.id;
                // console.log("Accepted delete user with ID:", id);

                // Close popover
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();

                // call IPC to delete user in database
                await window.api.deleteUser(parseInt(id));

                await loadUsers();
            });

            declineBtn?.addEventListener('click', () => {
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();
            });
        });
        //#endregion

    });

    const modalEl = document.getElementById('editUserModal');
    const modal = new bootstrap.Modal(modalEl);

    let currentUserId = null;

    // Open Modal
    table.addEventListener('click', (e) => {
        const editBtn = e.target.closest('.edit-btn');
        if (!editBtn) return;

        const id = editBtn.dataset.id;

        const user = users.find(u => u.id == id);
        if (!user) return;

        currentUserId = id;

        // Fill inputs
        document.getElementById('name').value = user.name;
        document.getElementById('emailAddress').value = user.email;
        document.getElementById('phoneNum').value = user.phone_num;

        document.getElementById('password').value = "";

        modal.show();
    });


    document.getElementById("saveChangesBtn").addEventListener("click", async () => {

        const name = document.getElementById('name').value;
        const email = document.getElementById('emailAddress').value;
        const phone = document.getElementById('phoneNum').value;
        const password = document.getElementById('password').value;

        await window.api.editUser(
            parseInt(currentUserId),
            name,
            email,
            phone,
            password
        );

        modal.hide();

        await loadUsers();
    });

    // Close popover when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.popover') && !e.target.closest('.popover-btn')) {
            document.querySelectorAll('.popover-btn').forEach(btn => {
                const instance = bootstrap.Popover.getInstance(btn);
                if (instance) instance.hide();
            });
        }
    });
}