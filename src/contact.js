document.addEventListener('DOMContentLoaded', () => {
  // Show the contact modal when "Kontakt" link is clicked
  document.getElementById("contactLink").addEventListener("click", function () {
    const contactModal = new bootstrap.Modal(document.getElementById("contactModal"));
    contactModal.show();
  });

  // Handle form submission
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const importance = document.getElementById("importance").value;
    const newsletter = document.getElementById("newsletter").checked ? "Yes" : "No";
    const message = document.getElementById("message").value;

    const formData = {
      fullName,
      email,
      importance,
      newsletter,
      message,
    };

    fetch("https://www.fulek.com/mvc/supit/project-contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Poruka je uspješno poslana!");
        document.getElementById("contactForm").reset();
      })
      .catch((error) => {
        console.error("Greška:", error);
        alert("Došlo je do pogreške pri slanju poruke.");
      });
  });

  // Focus on the input field when the modal is shown
  const myModal = document.getElementById('contactModal');
  const myInput = document.getElementById('fullName'); // Adjust if needed to target a different input

  if (myModal) {
    myModal.addEventListener('shown.bs.modal', () => {
      if (myInput) {
        myInput.focus();
      }
    });
  }
});
