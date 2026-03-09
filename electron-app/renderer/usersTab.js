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
                <td class='text-center'><button class='btn btn-primary'><i class="bi bi-pencil-fill"></i></button></td>
                <td class='text-center'><button class='btn btn-danger'><i class="bi bi-trash3-fill"></i></button></td>
            `;
        table.appendChild(row);
    });
}
