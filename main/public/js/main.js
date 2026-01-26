function deleteMessageContent() {
    let messageInput = document.getElementById("messageInput");
    messageInput.value = "";
}

document.getElementById("sendMessageForm").addEventListener("submit", async (e) => {
    e.preventDefault()
    
    let data = document.getElementById("messageInput").value;

    try {
        const res = await fetch("/sendMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: data })
        });
    
        const result = await res.json();
    
        new CreatePopup(result.msg, result.success);
        deleteMessageContent();
    
    } catch (err) {
        console.error(err);
        new CreatePopup("Szerverhiba történt!", false);
    }

})