/**
 * script.js - Interactive functionality for the portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Background on Scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Typewriter Effect for Hero Title
    const typewriterElement = document.getElementById('typewriter');
    const textToType = 'Computer Science Engineering Student';
    typewriterElement.textContent = ''; // Clear fallback text
    
    let i = 0;
    const typeWriter = () => {
        if (i < textToType.length) {
            typewriterElement.textContent += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 100); // Typing speed
        }
    };
    
    // Start typing effect slightly after page load
    setTimeout(typeWriter, 500);

    // 3. Intersection Observer for Scroll Animations (Fade-in elements)
    const fadeObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's the skills section, animate the progress bars
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200);
                    });
                }
                
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, fadeObserverOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Smooth Scrolling for Anchor Links (fallback/override for CSS scroll-behavior)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust scroll position slightly higher to account for fixed navbar
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Dark/Light Mode Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        const body = document.body;
        
        // Check local storage for preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            
            // Check if body has light-mode class to toggle icons and storage
            if (body.classList.contains('light-mode')) {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
                localStorage.setItem('theme', 'light');
            } else {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    console.log("Portfolio loaded successfully. Ready to impress! 🚀");
});
