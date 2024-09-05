document.querySelector("#registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username === "" || password === "") {
        showMessage("Korisničko ime i lozinka su obavezni.", "red");
        return;
    }
    const registerData = { username, password };

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.isSuccess) {
            window.location.href = "../pages/login.html";
        } else {
            showMessage("Registracija nije uspjela. " + (result.errorMessages[0] || ""), "red");
        }
    })
});

function showMessage(messageText, color) {
    const existingMessage = document.querySelector("#message");
    if (existingMessage) {
        existingMessage.remove();
    }

    const message = document.createElement("div");
    message.id = "message";
    message.style.color = color;
    message.textContent = messageText;
    document.querySelector("#registerForm").after(message);
}
