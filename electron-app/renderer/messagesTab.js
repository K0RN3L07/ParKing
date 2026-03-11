export async function loadAllMessages() {
    const messages = await window.api.getAllMessages();
    const table = document.getElementById("messagesTable");
    table.innerHTML = "";

    messages.forEach(message => {
        const date = new Date(message.sent_at);
        const formattedDate =
            date.getFullYear() + ". " +
            String(date.getMonth() + 1).padStart(2, "0") + ". " +
            String(date.getDate()).padStart(2, "0") + ". " +
            String(date.getHours()).padStart(2, "0") + ":" +
            String(date.getMinutes()).padStart(2, "0");

        const row = document.createElement("tr");

        row.innerHTML = `
                <td>${message.id}</td>
                <td>${message.name}</td>
                <td class='text-truncate' style='max-width:100px;'>${message.message}</td>
                <td>${formattedDate}</td>
                <td class='text-center'><button class='btn btn-primary'><i class="bi bi-pencil-fill"></i></button></td>
                <td class='text-center'><button class='btn btn-danger'><i class="bi bi-trash3-fill"></i></button></td>
            `;
        table.appendChild(row);
    });
}