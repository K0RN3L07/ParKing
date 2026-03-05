async function loadUsers() {

    const users = await window.api.getUsers();

    const table = document.getElementById("userTable");
    table.innerHTML = "";

    console.log(users);

    users.forEach(user => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone_num}</td>
            <td>${user.password}</td>
            <td>${user.registered_at}</td>
            <td class='text-center'><button class='btn btn-primary'><i class="bi bi-pencil-fill"></i></button></td>
            <td class='text-center'><button class='btn btn-danger'><i class="bi bi-trash3-fill"></i></button></td>
        `;

        table.appendChild(row);
    });
}

loadUsers();