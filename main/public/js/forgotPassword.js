//#region Email Field Animation

const email = document.getElementById("email");
const emailLabel = document.getElementById("emailLabel");

if (email && emailLabel) {
    email.addEventListener("focusin", () => {
        emailLabel.style.transform = "translateY(-210%)";
    });

    email.addEventListener("focusout", () => {
        emailLabel.style.transform =
            email.value !== "" ? "translateY(-210%)" : "translateY(-110%)";
    });
}

//#endregion

// Autofill fix
document.addEventListener("animationstart", (e) => {
    if (e.animationName === "onAutoFillStart") {
        const input = e.target;

        if (input === email) emailLabel.style.transform = "translateY(-210%)";
        if (input === password) passwordLabel.style.transform = "translateY(-210%)";
    }
});

// Send button
let sendButton = document.getElementById("sendButton");
const emailRegex =
        /^(?!.*\.\.)(?!.*[^\x00-\x7F])[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

sendButton.addEventListener("click", () => {
    if(!email.value) return new CreatePopup("Kérjük adja meg az email-címét!");
    if(!emailRegex.test(email.value)) return new CreatePopup("Kérjük valós email-címet adjon meg!");
    
    sessionStorage.setItem("popupMsg", "Hamarosan felvesszük veled a kapcsolatot!");
    sessionStorage.setItem("popupSuccess", true);

    window.location.href = "/";
})