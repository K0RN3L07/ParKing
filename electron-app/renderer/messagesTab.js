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
                <td class='text-center' style='min-width:115px'>
                    <button class="btn btn-md btn-dark text-danger popover-btn" data-id="${message.id}"><i class="bi bi-trash3-fill"></i></button>
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
                    <button class="btn btn-sm btn-success me-2 text-light accept-btn-message" data-id="${message.id}">Igen</button>
                    <button class="btn btn-sm btn-danger text-light decline-btn-message">Mégsem</button>
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

            const acceptBtn = popover.querySelector('.accept-btn-message');
            const declineBtn = popover.querySelector('.decline-btn-message');

            acceptBtn?.addEventListener('click', async (e) => {
                const id = e.currentTarget.dataset.id;

                // Close popover
                const instance = bootstrap.Popover.getInstance(deleteBtn);
                if (instance) instance.hide();

                // Optional: call IPC to delete message in database
                await window.api.deleteMessage(parseInt(id));

                await loadAllMessages();
            });

            declineBtn?.addEventListener('click', () => {
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