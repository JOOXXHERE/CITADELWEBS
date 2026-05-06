document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    // Reveal elements on scroll
    revealElements.forEach(el => revealObserver.observe(el));

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });

    // Typing Effect Hook
    const typeTarget = document.querySelector('.hero-content .highlight');
    const words = ['Digital Presence', 'User Experience', 'Web Solutions', 'Visual Brand'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        if (!typeTarget) return;
        const currentWord = words[wordIndex];
        const displayText = isDeleting 
            ? currentWord.substring(0, charIndex--) 
            : currentWord.substring(0, charIndex++);

        typeTarget.textContent = displayText;

        if (!isDeleting && charIndex > currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            charIndex = 0;
            typeSpeed = 200;
        } else {
            typeSpeed = isDeleting ? 100 : 150;
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing effect after initial reveal
    setTimeout(type, 1500);

    // Navigation and Interactivity complete

    // Counter Animation Hook
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const speed = 200; 
                
                const updateCount = () => {
                    const current = +entry.target.innerText.replace('+', '');
                    const increment = target / speed;

                    if (current < target) {
                        entry.target.innerText = Math.ceil(current + increment);
                        setTimeout(updateCount, 1);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});
