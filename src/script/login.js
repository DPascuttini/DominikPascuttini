document.querySelector("#loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginData = {
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value
    };
    login(loginData);
});

function login(loginData) {
    const form = document.querySelector("#loginForm");
    const message = document.createElement("div");

    fetch("https://www.fulek.com/data/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData)
    })
    .then((response) => response.json())
    .then((result) => {
        //console.log("API Response:", result);

        if (result && result.data && result.data.token) {
            sessionStorage.setItem("jwtToken", result.data.token);
            sessionStorage.setItem("username", result.data.username);

            //alert(`Bravo konacno si uspio login! JWT token je: ${result.data.token}`);
            location.assign("../pages/home.html");

        } else {
            message.style.color = "red";
            message.innerHTML = "Pogrešno korisničko ime ili lozinka, pokušajte ponovo";
            form.after(message);
        }
    })
    .catch((error) => {
        console.error("Problem connecting to the server:", error);
        alert("Problem connecting to the server: " + error.message);
    });
}
