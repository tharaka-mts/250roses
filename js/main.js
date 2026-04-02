document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor logic
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0, rx = 0, ry = 0;

    // Only enable custom cursor if device has hover capability (desktop)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursor && ring) {
        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            cursor.style.left = mx - 6 + 'px';
            cursor.style.top = my - 6 + 'px';
        });

        function animateRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            ring.style.left = rx - 18 + 'px';
            ring.style.top = ry - 18 + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        // Cursor scaling and color changes
        document.querySelectorAll('a, button, .menu-toggle, .radio-option, .upload-area, .faq-question, .contact-method').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2.5)';
                cursor.style.background = 'var(--gold)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--blush)';
            });
        });
    }

    // Hamburger Menu Logic
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });
        
        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Shared Intersection Observer for scroll animations
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Target elements for reveal animation
    document.querySelectorAll('.contact-method, .faq-item, .hours-item, .pillar, .cat-card, .profile-card, .stat').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${i * 0.08}s, transform 0.6s ease ${i * 0.08}s`;
        revealObserver.observe(el);
    });

    // Falling petals for Hero section (if exists)
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'petal';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDuration = (8 + Math.random() * 12) + 's';
            p.style.animationDelay = (Math.random() * 10) + 's';
            p.style.width = (4 + Math.random() * 8) + 'px';
            p.style.height = (6 + Math.random() * 12) + 'px';
            p.style.opacity = '0';
            hero.appendChild(p);
        }
    }
});
