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


    // ---- Smooth tilt on glass cards (desktop only, throttled with rAF) ----
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.querySelectorAll('.glass-card').forEach(card => {
            let tiltTicking = false;
            card.addEventListener('mousemove', (e) => {
                if (!tiltTicking) {
                    requestAnimationFrame(() => {
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = (y - centerY) / 25;
                        const rotateY = (centerX - x) / 25;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) translateZ(0)`;
                        tiltTicking = false;
                    });
                    tiltTicking = true;
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

});
