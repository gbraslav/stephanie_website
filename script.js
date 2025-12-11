/**
 * Stephanie Braslavsky - Resume Website
 * Interactive JavaScript Features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initBackToTop();
    initHeaderScroll();
    initLanguageBars();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate children with stagger effect
                const children = entry.target.querySelectorAll('.animate-child');
                children.forEach(function(child, index) {
                    setTimeout(function() {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(function(item) {
        observer.observe(item);
    });

    // Observe skill categories
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(function(category) {
        observer.observe(category);
    });

    // Observe education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(function(card) {
        observer.observe(card);
    });

    // Observe strength items
    const strengthItems = document.querySelectorAll('.strength-item');
    strengthItems.forEach(function(item) {
        observer.observe(item);
    });

    // Observe contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(function(item) {
        observer.observe(item);
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
    }
}

/**
 * Header Scroll Effect
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.pageYOffset;
    
    if (header) {
        window.addEventListener('scroll', function() {
            const currentScrollY = window.pageYOffset;
            
            // Add shadow when scrolled
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });
    }
}

/**
 * Animate Language Progress Bars
 */
function initLanguageBars() {
    const languageBars = document.querySelectorAll('.language-progress');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(function() {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    languageBars.forEach(function(bar) {
        observer.observe(bar);
    });
}

/**
 * Active Navigation Link Highlighting
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize active nav highlighting
initActiveNavHighlight();

/**
 * Parallax Effect for Hero Section (subtle)
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const circleOutline = document.querySelector('.circle-outline');
    
    if (hero && circleOutline) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            if (scrolled < window.innerHeight) {
                circleOutline.style.transform = 'translateY(calc(-50% + ' + rate + 'px))';
            }
        });
    }
}

// Initialize parallax
initParallax();

/**
 * Typing Effect for Hero Title (optional enhancement)
 */
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle utility function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * Handle window resize events
 */
window.addEventListener('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

/**
 * Preload critical resources
 */
function preloadResources() {
    // Preload fonts
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap'
    ];
    
    fonts.forEach(function(font) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

/**
 * Console welcome message
 */
console.log('%cStephanie Braslavsky', 'font-size: 24px; font-weight: bold; color: #1a1a1a;');
console.log('%cSales Enablement & Revenue Operations', 'font-size: 14px; color: #6b6b6b;');
console.log('%cBuilt with care and attention to detail.', 'font-size: 12px; color: #999;');
