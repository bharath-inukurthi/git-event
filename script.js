// Typing effect configuration
const typingText = document.querySelector('.typing-text');
const phrases = ['CSE Student', 'Web Developer', 'AI Enthusiast'];
let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
let isDeleting = false;

// Typing speed configuration
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenPhrases = 2000;
const pauseBeforeDeleting = 1500;

function typeWriter() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping && !isDeleting) {
        // Typing phase
        if (currentCharIndex < currentPhrase.length) {
            typingText.textContent += currentPhrase.charAt(currentCharIndex);
            currentCharIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            // Finished typing current phrase
            isTyping = false;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, pauseBeforeDeleting);
        }
    } else if (isDeleting) {
        // Deleting phase
        if (currentCharIndex > 0) {
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else {
            // Finished deleting current phrase
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            setTimeout(() => {
                isTyping = true;
                typeWriter();
            }, pauseBetweenPhrases);
        }
    }
}

// Smooth scrolling for navigation links
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const scrollArrow = document.querySelector('.scroll-arrow a');
    
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle scroll arrow
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Navbar background opacity on scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Initialize scroll arrow visibility
function initScrollArrow() {
    const scrollArrow = document.querySelector('.scroll-arrow');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Hide arrow when scrolled past 50% of viewport
        if (scrollPosition > windowHeight * 0.5) {
            scrollArrow.style.opacity = '0';
            scrollArrow.style.pointerEvents = 'none';
        } else {
            scrollArrow.style.opacity = '0.8';
            scrollArrow.style.pointerEvents = 'auto';
        }
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.about-section');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Mobile menu toggle (for future enhancement)
function initMobileMenu() {
    // This function can be expanded later for mobile hamburger menu
    const navLinks = document.querySelector('.nav-links');
    
    // Add responsive behavior
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            // Mobile specific behaviors can be added here
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing effect
    typeWriter();
    
    // Initialize all other features
    smoothScroll();
    updateActiveNavLink();
    handleNavbarScroll();
    initScrollArrow();
    initIntersectionObserver();
    initMobileMenu();
});

// Handle page refresh - ensure typing starts fresh
window.addEventListener('beforeunload', function() {
    typingText.textContent = '';
    currentPhraseIndex = 0;
    currentCharIndex = 0;
    isTyping = true;
    isDeleting = false;
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can be added here
}, 16)); // ~60fps
