// Typing effect configuration
const typingText = document.querySelector('.typing-text');
const aboutTypingText = document.querySelector('.about-typing');
const quoteText = document.querySelector('.quote-text');

const phrases = ['CSE Student', 'Web Developer', 'AI Enthusiast'];
const aboutPhrase = "Hi, I'm Alex, a 3rd Year CSE student passionate about AI and Web Dev.";
const quotes = [
    "Code is like humor. When you have to explain it, it's bad.",
    "The best way to predict the future is to create it.",
    "Innovation distinguishes between a leader and a follower."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isTyping = true;
let isDeleting = false;

// About section typing variables
let aboutCharIndex = 0;
let aboutTypingComplete = false;

// Quote rotator variables
let currentQuoteIndex = 0;
let quoteInterval;

// Typing speed configuration
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseBetweenPhrases = 2000;
const pauseBeforeDeleting = 1500;
const aboutTypingSpeed = 80;

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

// About section typing effect
function typeAboutText() {
    if (!aboutTypingText || aboutTypingComplete) return;
    
    if (aboutCharIndex < aboutPhrase.length) {
        aboutTypingText.textContent += aboutPhrase.charAt(aboutCharIndex);
        aboutCharIndex++;
        setTimeout(typeAboutText, aboutTypingSpeed);
    } else {
        aboutTypingComplete = true;
        // Hide cursor after typing is complete
        const aboutCursor = document.querySelector('.about-cursor');
        if (aboutCursor) {
            setTimeout(() => {
                aboutCursor.style.opacity = '0';
            }, 2000);
        }
        // Start quote rotator after about text is complete
        startQuoteRotator();
    }
}

// Quote rotator function
function startQuoteRotator() {
    if (!quoteText) return;
    
    function showQuote() {
        quoteText.style.opacity = '0';
        quoteText.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            quoteText.textContent = quotes[currentQuoteIndex];
            quoteText.style.opacity = '1';
            quoteText.style.transform = 'translateY(0)';
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        }, 300);
    }
    
    // Show first quote immediately
    showQuote();
    
    // Set up interval for quote rotation
    quoteInterval = setInterval(showQuote, 4000);
}

// Initialize About section animations when in view
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about-section');
    if (!aboutSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !aboutTypingComplete) {
                // Start typing effect with delay
                setTimeout(() => {
                    typeAboutText();
                }, 1000);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(aboutSection);
}

// Resume download functionality
// Initialize Skills section animations when in view
function initSkillsAnimations() {
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation to skill cards
                const skillCards = entry.target.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                
                // Animate section title
                const sectionTitle = entry.target.querySelector('.section-title');
                if (sectionTitle) {
                    sectionTitle.style.opacity = '1';
                    sectionTitle.style.transform = 'translateY(0)';
                }
                
                // Animate ticker
                const ticker = entry.target.querySelector('.learning-ticker');
                if (ticker) {
                    setTimeout(() => {
                        ticker.style.opacity = '1';
                        ticker.style.transform = 'translateY(0)';
                    }, 800);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    observer.observe(skillsSection);
}

// Add skill card hover sound effect (optional)
function initSkillCardInteractions() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse animation on hover
            this.style.animation = 'pulse 0.6s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            // Remove pulse animation
            this.style.animation = '';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            // Add click ripple effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Pause ticker animation when user hovers over it
function initTickerInteractions() {
    const ticker = document.querySelector('.ticker-text');
    const tickerContainer = document.querySelector('.learning-ticker');
    
    if (ticker && tickerContainer) {
        tickerContainer.addEventListener('mouseenter', () => {
            ticker.style.animationPlayState = 'paused';
        });
        
        tickerContainer.addEventListener('mouseleave', () => {
            ticker.style.animationPlayState = 'running';
        });
    }
}

function initResumeDownload() {
    const resumeBtn = document.querySelector('.resume-btn');
    if (!resumeBtn) return;
    
    resumeBtn.addEventListener('click', function() {
        // Create a sample resume download (you can replace this with actual resume file)
        const resumeContent = `
Alex's Resume
=============

Education:
- 3rd Year CSE Student

Skills:
- Web Development
- AI/Machine Learning
- JavaScript, Python, React

Contact:
- Email: alex@example.com
- LinkedIn: linkedin.com/in/alex
        `;
        
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Alex_Resume.txt';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Add visual feedback
        const originalText = resumeBtn.innerHTML;
        resumeBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"></path></svg> Downloaded!';
        resumeBtn.style.background = 'linear-gradient(45deg, #48bb78, #38a169)';
        
        setTimeout(() => {
            resumeBtn.innerHTML = originalText;
            resumeBtn.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
        }, 2000);
    });
}

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
    
    // Observe elements that should animate on scroll (excluding about section which has its own animations)
    const animateElements = document.querySelectorAll('.skills-section, .contact-section');
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
    
    // Initialize About section features
    initAboutAnimations();
    initResumeDownload();
    
    // Initialize Skills section features
    initSkillsAnimations();
    initSkillCardInteractions();
    initTickerInteractions();
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
