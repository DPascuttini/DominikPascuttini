document.addEventListener("DOMContentLoaded", function() {
    fetch('../../pages/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            setupNavbar();
        })
        .catch(error => console.error('Error loading navbar:', error));
  });
  
  document.addEventListener('updateNavbar', setupNavbar);
  
  function setupNavbar() {
    const token = sessionStorage.getItem('jwtToken');
    const loginItem = document.getElementById('loginItem');
    const logoutItem = document.getElementById('logoutItem');
    const nastavniPlanItem = document.getElementById('nastavniPlanItem');
    const contactLink = document.getElementById('contactLink');
  
    if (token) {
        loginItem.classList.add('d-none');
        logoutItem.classList.remove('d-none');
        nastavniPlanItem.classList.remove('d-none');
  
        document.getElementById('logoutLink').addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    } else {
        loginItem.classList.remove('d-none');
        logoutItem.classList.add('d-none');
        nastavniPlanItem.classList.add('d-none');
    }
  
    if (contactLink) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            openContact();
        });
    }
  }
  
  function logout() {
    sessionStorage.removeItem('jwtToken');
    window.location.href = '../pages/home.html';
  }
  
  function openContact() {
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
        .catch(error => console.error('Error loading contact modal HTML:', error));
  }