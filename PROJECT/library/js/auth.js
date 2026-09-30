// Authentication System for Educational Resource Library
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const userSection = document.querySelector('.user-section');
    const userInfo = document.querySelector('.user-info');
    const userIcon = document.querySelector('.user-icon');
    const welcomeText = document.querySelector('.user-info h2');
    
    // Authentication State
    let currentUser = null;
    
    // Check for existing user session
    function checkAuthStatus() {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            currentUser = JSON.parse(storedUser);
            updateUIForLoggedInUser();
            // Hide login/register nav links
            hideAuthNavLinks();
        } else {
            // If on the main page and not logged in, redirect to login
            if (window.location.pathname.includes('index.html') || 
                window.location.pathname === '/' || 
                window.location.pathname.endsWith('/')) {
                window.location.href = 'login.html';
            }
        }
    }
    
    // Hide login/register navigation links
    function hideAuthNavLinks() {
        const loginNavLink = document.getElementById('login-nav-link');
        const registerNavLink = document.getElementById('register-nav-link');
        
        if (loginNavLink) loginNavLink.style.display = 'none';
        if (registerNavLink) registerNavLink.style.display = 'none';
    }
    
    // Update UI for logged in user
    function updateUIForLoggedInUser() {
        if (currentUser) {
            welcomeText.textContent = `Welcome, ${currentUser.name}`;
            userIcon.innerHTML = '<i class="fas fa-user-check"></i>';
            
            // Add admin dashboard link for admin users
            if (currentUser.studentId === 'admin') {
                const adminLink = document.createElement('a');
                adminLink.href = 'admin.html';
                adminLink.className = 'btn-primary';
                adminLink.style.marginLeft = '15px';
                adminLink.style.padding = '8px 15px';
                adminLink.style.fontSize = '0.9rem';
                adminLink.innerHTML = '<i class="fas fa-user-shield"></i> Admin Dashboard';
                userInfo.appendChild(adminLink);
            }
            
            // Add logout button
            const logoutBtn = document.createElement('button');
            logoutBtn.id = 'logout-btn';
            logoutBtn.className = 'btn-secondary';
            logoutBtn.style.marginLeft = '15px';
            logoutBtn.style.padding = '8px 15px';
            logoutBtn.style.fontSize = '0.9rem';
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Logout';
            logoutBtn.addEventListener('click', logout);
            
            // Insert logout button after the welcome text
            userInfo.appendChild(logoutBtn);
        }
    }
    
    // Logout function
    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Firebase sign out (or fallback)
        if (typeof firebaseAuth !== 'undefined') {
            firebaseAuth.signOut().then(() => {
                // Redirect to login page
                window.location.href = 'login.html';
            }).catch((error) => {
                console.error('Sign out error:', error);
                // Redirect to login page even if sign out fails
                window.location.href = 'login.html';
            });
        } else {
            // Redirect to login page
            window.location.href = 'login.html';
        }
    }
    
    // Show notification
    function showNotification(message, type) {
        // Remove existing notification if present
        const existingNotification = document.getElementById('auth-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'auth-notification';
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
    
    // Initialize auth system
    checkAuthStatus();
});