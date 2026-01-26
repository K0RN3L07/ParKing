//#region Email Field Animation

const email = document.getElementById("email");
const emailLabel = document.getElementById("emailLabel");

if (email && emailLabel) {
    email.addEventListener("focusin", () => {
        emailLabel.style.transform = "translateY(-250%)";
    });

    email.addEventListener("focusout", () => {
        emailLabel.style.transform =
            email.value !== "" ? "translateY(-250%)" : "translateY(-110%)";
    });
}

//#endregion

//#region Password Field Animation

const password = document.getElementById("password");
const passwordLabel = document.getElementById("passwordLabel");

if (password && passwordLabel) {
    password.addEventListener("focusin", () => {
        passwordLabel.style.transform = "translateY(-250%)";
    });

    password.addEventListener("focusout", () => {
        passwordLabel.style.transform =
            password.value !== "" ? "translateY(-250%)" : "translateY(-110%)";
    });
}

//#endregion

//#region Login Fetch

const loginForm = document.getElementById("loginForm");

if (loginForm && email && password) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            email: email.value,
            password: password.value
        };

        try {
            const res = await fetch("/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (result.success) {
                sessionStorage.setItem("popupMsg", result.msg);
                sessionStorage.setItem("popupSuccess", result.success);

                window.location.href = "/";
            }
            else {
                new CreatePopup(result.msg, result.success);
            }

        } catch (err) {
            console.error(err);
            new CreatePopup("Szerverhiba történt!", false);
        }
    });
}

//#endregion

// Autofill fix
window.addEventListener("DOMContentLoaded", () => {
    if (!email.value) {
        emailLabel.style.transform = "translateY(-250%)";
    }

    if (!password.value) {
        passwordLabel.style.transform = "translateY(-250%)";
    }
});