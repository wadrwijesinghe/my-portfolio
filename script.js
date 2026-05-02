// script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Set Current Year in Footer ---
    document.getElementById('year').textContent = new Date().getFullYear();

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // --- Smooth Scrolling & Active Link Highlighting ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for navbar

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Add shadow to navbar on scroll
        const header = document.querySelector('.header');
        if (scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // --- Intersection Observer for Fade-In Animations ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // --- Project Modals Logic ---
    const modalBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtns = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.project-modal');

    // Open modal
    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            if (targetModal) {
                targetModal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });

    // Close modal via close button
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = 'auto'; // Restore scrolling
        });
    });

    // Close modal by clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    });

});
