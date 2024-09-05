document.querySelector("#registerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const registerData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };
    register(registerData);
});

function register(registerData) {
    const form = document.querySelector("#registerForm");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData)
    })
    .then((response) => response.json())
    .then((result) => {
        console.log("API Response:", result);

        if (result && result.isSuccess) {
            message.style.color = "green";
            message.innerHTML = "Registration successful! Redirecting to login screen in <span id='countdown'>3</span> seconds...";
            form.after(message);

            let countdown = 3;
            const countdownElement = document.getElementById('countdown');
            const intervalId = setInterval(() => {
                countdown--;
                countdownElement.textContent = countdown;
                if (countdown <= 0) {
                    clearInterval(intervalId);
                    location.assign("../pages/login.html");
                }
            }, 1000);

        } else {
            message.style.color = "red";
            message.innerHTML = result.errorMessages.join('<br>');
            form.after(message);
        }
    })
    .catch((error) => {
        console.error("Problem connecting to the server:", error);
        alert("Problem connecting to the server: " + error.message);
    });
}
