// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ===== Intersection Observer for Counter Animation =====
function initCounterAnimation() {
    const counter = document.getElementById('mainCounter');
    const targetValue = 551; // Casas recuperadas
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(counter, targetValue, 2500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
}

// ===== Smooth Scroll Enhancement =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Fade In Animation on Scroll =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Add initial styles and observe elements
    const animatedElements = document.querySelectorAll('.caso-card, .noticia-card, .stat-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeObserver.observe(el);
    });
}

// ===== Header Scroll Effect =====
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
}

// ===== Parallax Effect for Hero =====
function initParallax() {
    const heroDecoration = document.querySelector('.hero-decoration');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        
        if (heroDecoration) {
            heroDecoration.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    initCounterAnimation();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initParallax();
    
    console.log('🏠 Sitio de Casas Recuperadas - GCBA cargado correctamente');
});
