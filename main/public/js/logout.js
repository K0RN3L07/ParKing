// Get the logout button
document.querySelectorAll(".logoutBtn").forEach(btn => {
    btn.addEventListener("click", async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            const result = await res.json();

            new CreatePopup(result.msg, result.success);

            if (result.success) {
                sessionStorage.setItem("popupMsg", result.msg);
                sessionStorage.setItem("popupSuccess", result.success);

                window.location.href = "/";
            }

        } catch (err) {
            console.error(err);
            new CreatePopup("Szerverhiba történt!", false);
        }
    });
});