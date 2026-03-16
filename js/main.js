// ============================================
// PRIME PERFORMANCE GROUP — Shared Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));


    // ---- Navbar scroll effect (throttled with rAF) ----
    const navbar = document.getElementById('navbar');
    if (navbar) {
        let navTicking = false;
        window.addEventListener('scroll', () => {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    if (window.pageYOffset > 100) {
                        navbar.classList.add('shadow-2xl');
                        navbar.style.background = 'rgba(0, 0, 0, 0.85)';
                    } else {
                        navbar.classList.remove('shadow-2xl');
                        navbar.style.background = '';
                    }
                    navTicking = false;
                });
                navTicking = true;
            }
        }, { passive: true });
    }


    // ---- Mobile menu ----
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let menuOpen = false;

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuOpen = !menuOpen;
            if (menuOpen) {
                mobileMenu.classList.add('open');
                menuIconOpen.classList.add('hidden');
                menuIconClose.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            } else {
                mobileMenu.classList.remove('open');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
                document.body.style.overflow = '';
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuOpen = false;
                mobileMenu.classList.remove('open');
                menuIconOpen.classList.remove('hidden');
                menuIconClose.classList.add('hidden');
                document.body.style.overflow = '';
            });
        });
    }


    // ---- Parallax on orbs (throttled with rAF) ----
    const orbs = document.querySelectorAll('.orb');
    if (orbs.length > 0) {
        let orbTicking = false;
        window.addEventListener('scroll', () => {
            if (!orbTicking) {
                requestAnimationFrame(() => {
                    const scrollY = window.pageYOffset;
                    orbs.forEach((orb, i) => {
                        const speed = 0.03 + (i * 0.015);
                        orb.style.transform = `translateY(${scrollY * speed}px) translateZ(0)`;
                    });
                    orbTicking = false;
                });
                orbTicking = true;
            }
        }, { passive: true });
    }


});
