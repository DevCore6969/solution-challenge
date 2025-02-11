document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    // Open modal
    loginBtn.onclick = () => {
        modal.style.display = 'block';
    }
    
    // Close modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }
    
    // Close modal when clicking outside
    window.onclick = (e) => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    }
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}Form`).classList.add('active');
        });
    });
    
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        try {
            // Add your authentication logic here
            console.log('Login attempt:', { email, password });
        } catch (error) {
            console.error('Login error:', error);
        }
    });
    
    // Handle signup form submission
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        try {
            // Add your registration logic here
            console.log('Signup attempt:', { name, email, password });
        } catch (error) {
            console.error('Signup error:', error);
        }
    });
}); 