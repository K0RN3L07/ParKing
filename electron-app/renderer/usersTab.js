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

        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone_num}</td>
                <td class='text-truncate' style='max-width:100px;'>${user.password}</td>
                <td>${formattedDate}</td>
                <td class='text-center' style='min-width:115px'>
                    <button class="btn btn-md btn-dark me-2 text-primary"><i class="bi bi-pencil-fill"></i></button>
                    <button class="btn btn-md btn-dark text-danger popover-btn"><i class="bi bi-trash3-fill"></i></button>
                </td>
            `;
        table.appendChild(row);
    });

    document.querySelectorAll('.popover-btn').forEach(btn => {
        new bootstrap.Popover(btn, {
            html: true,
            sanitize: false,
            trigger: 'click',
            placement: 'right',
            customClass: 'popover-dark',
            content: `
      <div class='text-light'>
        <p class='h6 
    '>Biztosan törli?</p>
        <button class="btn btn-sm btn-success me-2 text-light accept-btn">Igen</button>
        <button class="btn btn-sm btn-danger text-light decline-btn">Mégsem</button>
      </div>
    `
        });

        // one popover at a time
        btn.addEventListener('click', function () {
            document.querySelectorAll('.popover-btn').forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const instance = bootstrap.Popover.getInstance(otherBtn);
                    if (instance) instance.hide();
                }
            });
        });

        // close when clicking outside
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.popover') && !e.target.closest('.popover-btn')) {
                document.querySelectorAll('.popover-btn').forEach(btn => {
                    const instance = bootstrap.Popover.getInstance(btn);
                    if (instance) instance.hide();
                });
            }
        });
    });
}

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('accept-btn')) {
        alert('Accepted!');
    }

    if (e.target.classList.contains('decline-btn')) {
        alert('Declined!');
    }
});