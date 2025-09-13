// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize language system
    if (typeof initLanguageSystem === 'function') {
        initLanguageSystem();
    }
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const increment = target / 60;
                let current = 0;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (counter.textContent.includes('%')) {
                            counter.textContent = Math.ceil(current) + '%';
                        } else if (counter.textContent.includes('+')) {
                            counter.textContent = Math.ceil(current).toLocaleString() + '+';
                        } else if (counter.textContent.includes('분')) {
                            counter.textContent = Math.ceil(current) + '분';
                        } else {
                            counter.textContent = Math.ceil(current).toLocaleString();
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (counter.textContent.includes('%')) {
                            counter.textContent = target + '%';
                        } else if (counter.textContent.includes('+')) {
                            counter.textContent = target.toLocaleString() + '+';
                        } else if (counter.textContent.includes('분')) {
                            counter.textContent = target + '분';
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    }
                };

                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

animateCounters();

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;

        setTimeout(() => {
            alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Video Modal Functions
function initVideoModal() {
    const videoBtn = document.querySelector('.video-btn');
    const videoModal = document.querySelector('.video-modal');
    const closeBtn = document.querySelector('.close-modal');
    const videoFrame = document.querySelector('.video-frame iframe');

    if (videoBtn && videoModal && closeBtn) {
        videoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add video URL when modal opens
            if (videoFrame && !videoFrame.src) {
                videoFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
            }
        });

        closeBtn.addEventListener('click', function() {
            videoModal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Remove video URL to stop playback
            if (videoFrame) {
                videoFrame.src = '';
            }
        });

        // Close modal on backdrop click
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (videoFrame) {
                    videoFrame.src = '';
                }
            }
        });

        // Close modal on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (videoFrame) {
                    videoFrame.src = '';
                }
            }
        });
    }
}

// Enhanced parallax effect for hero section
function initHeroParallax() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.2; // Reduced parallax intensity

        if (scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${parallax}px)`;
        } else {
            heroSection.style.transform = 'translateY(0)'; // Reset when out of view
        }
    });
}

// Tech cards hover enhancements
function initTechCards() {
    const techCards = document.querySelectorAll('.tech-card');

    techCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.borderLeftColor = '#2c5aa0';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderLeftColor = 'transparent';
        });
    });
}

// Initialize all hero enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully loaded
    setTimeout(() => {
        initVideoModal();
        initHeroParallax();
        initTechCards();
    }, 100);
});

console.log('벨리코 웹사이트가 로드되었습니다.');