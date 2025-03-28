document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const menu = document.querySelector('.menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Scroll animations - with improved performance
    const scrollAnimationElements = document.querySelectorAll(
        '.scroll-animation, .scroll-animation-left, .scroll-animation-right, .scroll-animation-fade, .scroll-animation-scale'
    );
    
    // Use more efficient options for Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Unobserve after animation is triggered to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% of the element must be visible
        rootMargin: '0px 0px -10px 0px' // trigger earlier for smoother appearance
    });
    
    // Observe all animation elements
    scrollAnimationElements.forEach(el => {
        observer.observe(el);
    });
    
    // Gallery lightbox functionality (if needed)
    const galleryLinks = document.querySelectorAll('.gallery-link');
    const body = document.body;
    
    galleryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const imgSrc = this.querySelector('img').getAttribute('src');
            const caption = this.getAttribute('data-caption') || '';
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <button class="lightbox-close">&times;</button>
                    <img src="${imgSrc}" alt="${caption}">
                    ${caption ? `<div class="lightbox-caption">${caption}</div>` : ''}
                </div>
            `;
            
            // Add lightbox to body
            body.appendChild(lightbox);
            
            // Prevent scrolling when lightbox is open
            body.style.overflow = 'hidden';
            
            // Close lightbox when clicking on it
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                    body.removeChild(lightbox);
                    body.style.overflow = '';
                }
            });
            
            // Close on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && document.querySelector('.lightbox')) {
                    body.removeChild(lightbox);
                    body.style.overflow = '';
                }
            });
        });
    });
});

// Disable parallax effect which causes performance issues on mobile
// window.addEventListener('scroll', function() {
//     const parallaxElements = document.querySelectorAll('.website-background-overlay-image');
    
//     parallaxElements.forEach(element => {
//         const scrollPosition = window.pageYOffset;
//         // Move background at a slower rate than scroll (parallax effect)
//         element.style.transform = `translateY(${scrollPosition * 0.4}px)`;
//     });
// });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Smooth scroll to element
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Account for fixed header
                behavior: 'smooth'
            });
        }
    });
}); 