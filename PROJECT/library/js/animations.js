/**
 * Animation System for Admin Dashboard
 * Implements click animations and interactive effects
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all click animations
    initClickAnimations();
    
    // Initialize table row animations after a short delay
    setTimeout(initTableRowAnimations, 500);
});

/**
 * Initialize click animations for interactive elements
 */
function initClickAnimations() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .action-btn, .logout-btn');
    buttons.forEach(button => {
        // Ensure the button has relative positioning for ripple
        if (button.style.position === '' || button.style.position === 'static') {
            button.style.position = 'relative';
        }
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRippleEffect);
    });
    
    // Add ripple effect to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        if (card.style.position === '' || card.style.position === 'static') {
            card.style.position = 'relative';
        }
        card.style.overflow = 'hidden';
        card.addEventListener('click', createRippleEffect);
    });
    
    // Add pulse effect to icons
    const icons = document.querySelectorAll('.stat-icon, .logo i, .section-title i');
    icons.forEach(icon => {
        icon.addEventListener('click', createPulseEffect);
    });
}

/**
 * Initialize click animations for table rows
 */
function initTableRowAnimations() {
    // Add click effect to table rows
    const tableRows = document.querySelectorAll('.users-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't trigger if clicking on action buttons
            if (e.target.closest('.action-btn')) return;
            
            // Add visual feedback
            this.classList.add('row-clicked');
            setTimeout(() => {
                this.classList.remove('row-clicked');
            }, 200);
        });
    });
}

/**
 * Create ripple effect on click
 * @param {Event} event - Click event
 */
function createRippleEffect(event) {
    const target = event.currentTarget;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    // Position ripple at click location
    const rect = target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Style ripple
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    // Add ripple to target
    target.appendChild(ripple);
    
    // Remove ripple after animation completes
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

/**
 * Create pulse effect on click
 * @param {Event} event - Click event
 */
function createPulseEffect(event) {
    const target = event.currentTarget;
    
    // Add pulse class
    target.classList.add('pulse-animation');
    
    // Remove pulse class after animation completes
    setTimeout(() => {
        target.classList.remove('pulse-animation');
    }, 300);
}

/**
 * Add floating animation to elements
 * @param {string} selector - CSS selector for elements
 */
function addFloatingAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
        // Add delay for staggered animation
        element.style.animationDelay = (index * 0.2) + 's';
        element.classList.add('floating-element');
    });
}

/**
 * Add entrance animation to elements
 * @param {string} selector - CSS selector for elements
 * @param {string} animationClass - CSS class for animation
 */
function addEntranceAnimation(selector, animationClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        element.classList.add(animationClass);
    });
}

// Export functions for use in other modules
window.AnimationSystem = {
    initClickAnimations,
    initTableRowAnimations,
    createRippleEffect,
    createPulseEffect,
    addFloatingAnimation,
    addEntranceAnimation
};