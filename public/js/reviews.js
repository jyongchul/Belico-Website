// Reviews page functionality

// Filter reviews by category
function filterReviews(category) {
    const reviewCards = document.querySelectorAll('.review-card');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    reviewCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter reviews by rating
function filterByRating(rating) {
    const reviewCards = document.querySelectorAll('.review-card');

    reviewCards.forEach(card => {
        const cardRating = parseInt(card.getAttribute('data-rating'));

        if (cardRating >= rating) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Load more reviews
function loadMoreReviews() {
    const additionalReviews = [
        {
            name: '강○○',
            category: '평발',
            rating: 4,
            text: '평발로 인해 발목과 무릎까지 아팠는데, 맞춤형 깔창 착용 후 통증이 많이 줄었어요. 아직 완전히 좋아지지는 않았지만 꾸준히 착용해볼 예정입니다.',
            date: '2025.04.10',
            store: '강남점'
        },
        {
            name: '조○○',
            category: '무지외반증',
            rating: 5,
            text: '수술을 고려했을 정도로 심했던 무지외반증이 깔창으로 많이 개선됐어요. 통증도 줄고 발가락 모양도 조금씩 좋아지고 있습니다.',
            date: '2025.03.28',
            store: '부산점'
        },
        {
            name: '신○○',
            category: '족저근막염',
            rating: 5,
            text: '간호사 일을 하다보니 하루 종일 서 있어야 해서 족저근막염이 생겼는데, 벨리코 깔창 덕분에 업무에 지장없이 일할 수 있게 됐어요.',
            date: '2025.03.15',
            store: '대구점'
        }
    ];

    const reviewsGrid = document.getElementById('reviewsGrid');

    additionalReviews.forEach((review, index) => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        reviewCard.setAttribute('data-category', review.category);
        reviewCard.setAttribute('data-rating', review.rating);
        reviewCard.setAttribute('data-aos', 'fade-up');
        reviewCard.setAttribute('data-aos-delay', (index + 1) * 100);

        const stars = '⭐'.repeat(review.rating);

        reviewCard.innerHTML = `
            <div class="review-header">
                <div class="reviewer-info">
                    <div class="reviewer-avatar">${review.name}</div>
                    <div class="reviewer-details">
                        <h4>${review.name}님</h4>
                        <span>${review.category}</span>
                    </div>
                </div>
                <div class="rating">${stars}</div>
            </div>
            <div class="review-text">
                ${review.text}
            </div>
            <div class="review-meta">
                <span>📅 ${review.date}</span>
                <span>📍 ${review.store}</span>
            </div>
        `;

        reviewsGrid.appendChild(reviewCard);
    });

    // Hide load more button after loading additional reviews
    const loadMoreSection = document.querySelector('.load-more-section');
    loadMoreSection.style.display = 'none';

    // Re-initialize AOS for new elements
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
}

// Review form submission
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');

    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(reviewForm);
            const reviewData = {
                name: formData.get('reviewerName'),
                category: formData.get('reviewCategory'),
                store: formData.get('visitedStore'),
                rating: formData.get('rating'),
                content: formData.get('reviewContent'),
                images: formData.getAll('reviewImages'),
                agreeToTerms: formData.get('agreeToTerms')
            };

            // Validate form
            if (!reviewData.name || !reviewData.category || !reviewData.rating || !reviewData.content) {
                alert('필수 항목을 모두 입력해주세요.');
                return;
            }

            if (!reviewData.agreeToTerms) {
                alert('개인정보 수집 및 이용에 동의해주세요.');
                return;
            }

            // Show loading
            const submitBtn = reviewForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '등록 중...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('후기가 성공적으로 등록되었습니다.\n검토 후 사이트에 게시됩니다.\n\n소중한 후기 감사드립니다!');
                resetForm();

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Rating input interaction
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            const labels = document.querySelectorAll('.rating-input label');
            labels.forEach(label => label.classList.remove('selected'));

            const selectedLabel = document.querySelector(`label[for="${this.id}"]`);
            if (selectedLabel) {
                selectedLabel.classList.add('selected');
            }
        });
    });

    // File input validation
    const fileInput = document.getElementById('reviewImages');
    if (fileInput) {
        fileInput.addEventListener('change', function() {
            const files = this.files;
            if (files.length > 3) {
                alert('최대 3장까지만 업로드 가능합니다.');
                this.value = '';
                return;
            }

            // Check file sizes (max 5MB per file)
            for (let file of files) {
                if (file.size > 5 * 1024 * 1024) {
                    alert(`${file.name} 파일이 너무 큽니다. 5MB 이하의 파일을 선택해주세요.`);
                    this.value = '';
                    return;
                }
            }
        });
    }
});

// Reset form
function resetForm() {
    const form = document.getElementById('reviewForm');
    if (form) {
        form.reset();

        // Reset rating labels
        const labels = document.querySelectorAll('.rating-input label');
        labels.forEach(label => label.classList.remove('selected'));
    }
}

// Animate statistics counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const text = counter.textContent;

                // Extract number and suffix
                const match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
                if (match) {
                    const target = parseFloat(match[1]);
                    const suffix = match[2];
                    const increment = target / 60;
                    let current = 0;

                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            if (suffix === '%') {
                                counter.textContent = Math.ceil(current) + suffix;
                            } else if (suffix === '+') {
                                counter.textContent = Math.ceil(current).toLocaleString() + suffix;
                            } else if (suffix === '/5') {
                                counter.textContent = current.toFixed(1) + suffix;
                            } else {
                                counter.textContent = Math.ceil(current).toLocaleString() + suffix;
                            }
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = text;
                        }
                    };

                    updateCounter();
                }

                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Initialize counters animation when page loads
document.addEventListener('DOMContentLoaded', animateCounters);