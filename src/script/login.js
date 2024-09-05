document.querySelector("#loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    const loginData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };

    processLogin(loginData);
});

function processLogin(loginData) {
    const form = document.querySelector("#loginForm");
    clearPreviousMessages(form); 

    fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.isSuccess) {
            localStorage.setItem("jwtToken", result.data.token);
            window.location.href = "../pages/home.html";
        } else {
            displayMessage("Pogrešno korisničko ime ili lozinka, pokušajte ponovo", "red", form);
        }
    })
}
function displayMessage(messageText, color, form) {
    const message = document.createElement("div");
    message.style.color = color;
    message.textContent = messageText;
    form.after(message);
}

function clearPreviousMessages(form) {
    const previousMessage = form.nextElementSibling;
    if (previousMessage && previousMessage.tagName === "DIV") {
        previousMessage.remove(); 
    }
}
