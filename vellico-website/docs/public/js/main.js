// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 100
    });
});

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.boxShadow = 'none';
    }
});

// Media Gallery Tabs
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simple form validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const phone = this.querySelector('input[type="tel"]').value.trim();
            const type = this.querySelector('select').value;
            const message = this.querySelector('textarea').value.trim();
            
            if (!name || !phone || !type) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }
            
            // Phone number validation (Korean format)
            const phoneRegex = /^(010|011|016|017|018|019)-?\d{3,4}-?\d{4}$/;
            if (!phoneRegex.test(phone.replace(/[^0-9]/g, ''))) {
                alert('올바른 휴대폰 번호를 입력해주세요.');
                return;
            }
            
            // Show success message
            alert('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
            
            // Reset form
            this.reset();
            
            // In a real application, you would send the data to your server
            console.log('Form submission:', formObject);
        });
    }
});

// Kakao Talk Links
document.addEventListener('DOMContentLoaded', function() {
    const kakaoLinks = document.querySelectorAll('.kakao-link, .kakao-partnership');
    
    kakaoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would use the actual Kakao Talk channel
            const message = '안녕하세요! 벨리코 맞춤형 깔창에 대해 문의드립니다.';
            const encodedMessage = encodeURIComponent(message);
            
            // For demonstration, we'll show an alert
            // In production, you would redirect to the actual Kakao Talk channel
            alert('카카오톡 상담을 위해 @벨리코 채널을 검색하거나, 전화(010-4855-5991)로 연락주세요!');
            
            // Example of actual Kakao Talk URL (uncomment and modify with real channel ID)
            // window.open(`https://pf.kakao.com/_your_channel_id/chat`, '_blank');
        });
    });
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            let value = this.value.replace(/[^0-9]/g, '');
            
            if (value.length >= 3 && value.length <= 7) {
                if (value.startsWith('010')) {
                    value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
                }
            } else if (value.length > 7) {
                if (value.startsWith('010')) {
                    value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
                }
            }
            
            this.value = value;
        });
    });
});

// Intersection Observer for animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that don't have AOS animation
    const elementsToAnimate = document.querySelectorAll('.benefit-item, .review-item, .use-case');
    elementsToAnimate.forEach(el => {
        if (!el.hasAttribute('data-aos')) {
            observer.observe(el);
        }
    });
});

// Counter animation for numbers
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString('ko-KR');
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString('ko-KR');
        }
    };
    
    window.requestAnimationFrame(step);
}

// Video thumbnail click handler
document.addEventListener('DOMContentLoaded', function() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // In a real implementation, you would embed the actual video or open a modal
            const videoItem = this.closest('.video-item');
            const title = videoItem.querySelector('h4').textContent;
            
            alert(`"${title}" 영상을 재생합니다. (실제 구현에서는 동영상 플레이어가 열립니다)`);
            
            // Example of opening a YouTube video
            // const videoId = 'YOUR_VIDEO_ID';
            // window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
    });
});

// Scroll to top functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2c5aa0;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect for scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.background = '#1e3f73';
        this.style.transform = 'translateY(-2px)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.background = '#2c5aa0';
        this.style.transform = 'translateY(0)';
    });
});

// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading spinner if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
});

// Image lazy loading fallback (for older browsers)
document.addEventListener('DOMContentLoaded', function() {
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const script = document.createElement('script');
        script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
        document.head.appendChild(script);
        
        script.onload = function() {
            const images = document.querySelectorAll('img[loading="lazy"]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.src;
                        img.removeAttribute('loading');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        };
    }
});

// Add click tracking for analytics (placeholder)
document.addEventListener('DOMContentLoaded', function() {
    const trackableElements = document.querySelectorAll('a[href^="tel:"], .btn, .kakao-link, .kakao-partnership');
    
    trackableElements.forEach(element => {
        element.addEventListener('click', function() {
            const elementType = this.className;
            const elementText = this.textContent.trim();
            
            // In a real implementation, you would send this to your analytics service
            console.log('Click tracked:', {
                type: elementType,
                text: elementText,
                timestamp: new Date().toISOString()
            });
            
            // Example Google Analytics tracking (uncomment and configure)
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'click', {
            //         event_category: 'engagement',
            //         event_label: elementText
            //     });
            // }
        });
    });
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace broken images with a placeholder
            this.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="100%25" height="100%25" fill="%23f8f9fa"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial,sans-serif" font-size="14" fill="%236c757d" text-anchor="middle" dy=".3em"%3E이미지 로딩 중...%3C/text%3E%3C/svg%3E';
            this.alt = '이미지를 불러올 수 없습니다';
            this.style.opacity = '0.7';
        });
    });
});

// Print styles helper
window.addEventListener('beforeprint', function() {
    // Expand all collapsed sections for printing
    const collapsedElements = document.querySelectorAll('.tab-content');
    collapsedElements.forEach(element => {
        element.style.display = 'block';
    });
});

window.addEventListener('afterprint', function() {
    // Restore original display states
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        if (!content.classList.contains('active')) {
            content.style.display = 'none';
        }
    });
});