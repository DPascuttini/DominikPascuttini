document.addEventListener("DOMContentLoaded", function() {
  fetch('../../pages/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar').innerHTML = data;
      setupContactButton();
    })
    .catch(error => console.error('Error loading navbar:', error));
});

function setupContactButton() {
  const contactLink = document.getElementById('contactLink');

  if (contactLink) {
    contactLink.addEventListener('click', () => {
      fetch('../../pages/contact.html')
        .then(response => response.text())
        .then(modalHTML => {
          document.body.insertAdjacentHTML('beforeend', modalHTML);

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '../../src/style/contact.css';
          document.head.appendChild(link);
          document.getElementById('contactModalClose').addEventListener('click', () => {
            document.getElementById('contactModalOverlay').remove();
          });
        })
        .catch(error => console.error('Error loading modal HTML:', error));
    });
  }
}