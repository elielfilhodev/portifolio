document.addEventListener('DOMContentLoaded', function () {
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('navLinks');
            const header = document.getElementById('header');
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            const navMenuLinks = document.querySelectorAll('.nav-links a');
            const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

            // --- Mobile Menu Toggle ---
            const toggleMenu = () => {
                navLinks.classList.toggle('active');
                const icon = hamburger.querySelector('i');
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            };

            hamburger.addEventListener('click', toggleMenu);

            // --- Close Menu on Link Click ---
            navMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                });
            });

            // --- Header Scroll & Scroll-to-Top Button ---
            window.addEventListener('scroll', () => {
                // Header effect
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }

                // Scroll to top button visibility
                if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                    scrollTopBtn.style.display = "flex";
                } else {
                    scrollTopBtn.style.display = "none";
                }
            }, { passive: true });

            // --- Scroll to top functionality ---
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });

            // --- Smooth Scrolling for ALL Anchor Links ---
            allAnchorLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        e.preventDefault();
                        const headerOffset = header.offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });


            // --- Animation on Scroll ---
            const animatedElements = document.querySelectorAll('.about-text, .about-image, .project-card');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        // The CSS animation will run once opacity is 1
                        if (entry.target.classList.contains('about-text')) {
                            entry.target.style.animationName = 'fadeInLeft';
                        } else if (entry.target.classList.contains('about-image')) {
                            entry.target.style.animationName = 'fadeInRight';
                        } else {
                            entry.target.style.animationName = 'fadeInUp';
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });

            animatedElements.forEach(el => {
                el.style.opacity = '0'; // Hide elements initially
                observer.observe(el);
            });
        });