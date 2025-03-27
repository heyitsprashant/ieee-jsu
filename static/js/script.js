document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            menu.classList.toggle('active');
            // Optional: Change the button icon when menu is toggled
            this.innerHTML = menu.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && menu.classList.contains('active')) {
            menu.classList.remove('active');
            if (mobileMenuButton) {
                mobileMenuButton.innerHTML = '☰';
            }
        }
    });
    
    // Close menu when window is resized beyond mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && menu.classList.contains('active')) {
            menu.classList.remove('active');
            if (mobileMenuButton) {
                mobileMenuButton.innerHTML = '☰';
            }
        }
    });
}); 

