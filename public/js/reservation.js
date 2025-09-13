// Reservation system functionality

// Set minimum date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const minDate = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', minDate);
    }

    // Initialize form validation
    setupFormValidation();

    // Load dealer locations
    loadDealerLocations();

    // Setup form interactions
    setupFormInteractions();
});

// Form validation setup
function setupFormValidation() {
    const form = document.getElementById('reservationForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateReservationForm()) {
            submitReservation();
        }
    });

    // Real-time validation
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
    });

    // Phone number formatting
    const phoneInput = document.getElementById('customerPhone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });
    }
}

// Validate individual field
function validateField(field) {
    const errorClass = 'field-error';
    const successClass = 'field-success';

    // Remove existing validation classes
    field.classList.remove(errorClass, successClass);

    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = '필수 입력 항목입니다.';
    } else if (field.type === 'email' && field.value && !isValidEmail(field.value)) {
        isValid = false;
        errorMessage = '유효한 이메일 주소를 입력해주세요.';
    } else if (field.type === 'tel' && field.value && !isValidPhone(field.value)) {
        isValid = false;
        errorMessage = '유효한 전화번호를 입력해주세요.';
    } else if (field.type === 'date' && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            isValid = false;
            errorMessage = '내일 이후 날짜를 선택해주세요.';
        }

        // Check if selected date is weekend (Sunday = 0, Saturday = 6)
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0) { // Sunday
            isValid = false;
            errorMessage = '일요일은 휴무입니다. 다른 날짜를 선택해주세요.';
        }
    }

    // Show/hide error message
    let errorElement = field.parentNode.querySelector('.error-message');

    if (!isValid) {
        field.classList.add(errorClass);

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = errorMessage;
    } else {
        field.classList.add(successClass);
        if (errorElement) {
            errorElement.remove();
        }
    }

    return isValid;
}

// Validate entire form
function validateReservationForm() {
    const form = document.getElementById('reservationForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    // Validate required fields
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Validate at least one symptom is selected
    const symptoms = form.querySelectorAll('input[name="symptoms"]:checked');
    if (symptoms.length === 0) {
        isValid = false;
        showFormError('증상을 최소 하나 이상 선택해주세요.');
    }

    // Validate consent checkboxes
    const requiredConsents = form.querySelectorAll('input[name="privacyConsent"], input[name="cancellationPolicy"]');
    requiredConsents.forEach(checkbox => {
        if (!checkbox.checked) {
            isValid = false;
            showFormError('필수 동의 항목을 확인해주세요.');
        }
    });

    return isValid;
}

// Format phone number input
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 11) {
        value = value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (value.length >= 7) {
        value = value.replace(/(\d{3})(\d{4})(\d{0,4})/, '$1-$2-$3');
    } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{0,4})/, '$1-$2');
    }

    input.value = value;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation
function isValidPhone(phone) {
    const phoneRegex = /^01[0-9]-?\d{4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Show form error message
function showFormError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.form-error-message');
    if (existingError) {
        existingError.remove();
    }

    // Create and show new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.textContent = message;

    const form = document.getElementById('reservationForm');
    form.insertBefore(errorDiv, form.firstChild);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);

    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Submit reservation
function submitReservation() {
    const form = document.getElementById('reservationForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = '예약 처리 중...';
    submitBtn.disabled = true;

    // Collect form data
    const formData = new FormData(form);
    const reservationData = {
        customerName: formData.get('customerName'),
        customerPhone: formData.get('customerPhone'),
        customerEmail: formData.get('customerEmail'),
        customerAge: formData.get('customerAge'),
        symptoms: formData.getAll('symptoms'),
        symptomDescription: formData.get('symptomDescription'),
        previousTreatment: formData.get('previousTreatment'),
        preferredLocation: formData.get('preferredLocation'),
        preferredDate: formData.get('preferredDate'),
        preferredTime: formData.get('preferredTime'),
        alternativeTime: formData.get('alternativeTime'),
        specialRequests: formData.get('specialRequests'),
        howDidYouHear: formData.get('howDidYouHear'),
        privacyConsent: formData.get('privacyConsent'),
        marketingConsent: formData.get('marketingConsent'),
        cancellationPolicy: formData.get('cancellationPolicy')
    };

    // Simulate API call (replace with actual backend integration)
    setTimeout(() => {
        // Generate reservation number
        const reservationNumber = generateReservationNumber();

        // Show success message
        showReservationSuccess(reservationData, reservationNumber);

        // Reset form
        form.reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        // Send confirmation email (simulation)
        sendConfirmationEmail(reservationData, reservationNumber);

    }, 2000);
}

// Generate reservation number
function generateReservationNumber() {
    const today = new Date();
    const year = today.getFullYear().toString().substr(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const date = today.getDate().toString().padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    return `BL${year}${month}${date}${random}`;
}

// Show reservation success message
function showReservationSuccess(data, reservationNumber) {
    const locationNames = {
        'gangnam': '벨리코 강남점',
        'hongdae': '벨리코 홍대점',
        'haeundae': '벨리코 해운대점',
        'dongseong': '벨리코 동성로점',
        'suwon': '벨리코 수원점',
        'songdo': '벨리코 송도점'
    };

    const locationName = locationNames[data.preferredLocation] || data.preferredLocation;
    const formattedDate = formatDate(data.preferredDate);

    const successMessage = `
        예약이 성공적으로 접수되었습니다!

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📋 예약 정보
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        예약번호: ${reservationNumber}
        성명: ${data.customerName}
        연락처: ${data.customerPhone}

        예약 대리점: ${locationName}
        희망 날짜: ${formattedDate}
        희망 시간: ${data.preferredTime}

        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        📞 다음 단계
        ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        1. 예약 확정 문자를 보내드립니다
        2. 담당자가 1-2일 내 연락드립니다
        3. 최종 예약 시간을 확정합니다

        변경 및 취소: 010-4855-5991

        감사합니다!
    `;

    alert(successMessage);
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = days[date.getDay()];

    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
}

// Send confirmation email (simulation)
function sendConfirmationEmail(data, reservationNumber) {
    console.log('Sending confirmation email...', {
        to: data.customerEmail,
        reservationNumber: reservationNumber,
        customerName: data.customerName
    });

    // In real implementation, this would call email service API
}

// Load dealer locations dynamically
function loadDealerLocations() {
    // In real implementation, this would fetch from API
    const dealers = [
        { id: 'gangnam', name: '벨리코 강남점', address: '서울특별시 강남구 테헤란로 123' },
        { id: 'hongdae', name: '벨리코 홍대점', address: '서울특별시 마포구 홍익로 456' },
        { id: 'haeundae', name: '벨리코 해운대점', address: '부산광역시 해운대구 해운대해변로 789' },
        { id: 'dongseong', name: '벨리코 동성로점', address: '대구광역시 중구 동성로 101' },
        { id: 'suwon', name: '벨리코 수원점', address: '경기도 수원시 영통구 광교로 202' },
        { id: 'songdo', name: '벨리코 송도점', address: '인천광역시 연수구 송도동 303' }
    ];

    const select = document.getElementById('preferredLocation');
    if (select) {
        // Clear existing options except the first one
        while (select.children.length > 1) {
            select.removeChild(select.lastChild);
        }

        // Add dealer options
        dealers.forEach(dealer => {
            const option = document.createElement('option');
            option.value = dealer.id;
            option.textContent = `${dealer.name} - ${dealer.address}`;
            select.appendChild(option);
        });
    }
}

// Setup form interactions
function setupFormInteractions() {
    // Update time slots based on selected location and date
    const locationSelect = document.getElementById('preferredLocation');
    const dateInput = document.getElementById('preferredDate');

    if (locationSelect && dateInput) {
        [locationSelect, dateInput].forEach(element => {
            element.addEventListener('change', updateAvailableTimeSlots);
        });
    }

    // Handle "기타" symptom selection
    const symptomsCheckboxes = document.querySelectorAll('input[name="symptoms"]');
    symptomsCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.value === '기타' && this.checked) {
                // Add text input for other symptoms
                addOtherSymptomInput();
            }
        });
    });
}

// Update available time slots
function updateAvailableTimeSlots() {
    const location = document.getElementById('preferredLocation').value;
    const date = document.getElementById('preferredDate').value;

    if (!location || !date) return;

    // In real implementation, this would fetch available times from API
    // For now, simulate some times being unavailable
    const timeSelects = ['preferredTime', 'alternativeTime'];

    timeSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        const options = select.querySelectorAll('option:not(:first-child)');

        options.forEach(option => {
            // Simulate some random unavailability
            const isAvailable = Math.random() > 0.3;

            if (isAvailable) {
                option.disabled = false;
                option.textContent = option.textContent.replace(' (예약불가)', '');
            } else {
                option.disabled = true;
                if (!option.textContent.includes('(예약불가)')) {
                    option.textContent += ' (예약불가)';
                }
            }
        });
    });
}

// Add other symptom input
function addOtherSymptomInput() {
    const checkboxGroup = document.querySelector('.checkbox-group');
    let otherInput = document.getElementById('otherSymptomInput');

    if (!otherInput) {
        otherInput = document.createElement('input');
        otherInput.type = 'text';
        otherInput.id = 'otherSymptomInput';
        otherInput.name = 'otherSymptom';
        otherInput.placeholder = '기타 증상을 입력해주세요';
        otherInput.style.marginTop = '10px';
        otherInput.style.width = '100%';

        checkboxGroup.appendChild(otherInput);
    }
}

// Reset form
function resetForm() {
    if (confirm('모든 입력 내용이 삭제됩니다. 계속하시겠습니까?')) {
        const form = document.getElementById('reservationForm');
        form.reset();

        // Remove validation classes and error messages
        const fields = form.querySelectorAll('.field-error, .field-success');
        fields.forEach(field => {
            field.classList.remove('field-error', 'field-success');
        });

        const errorMessages = form.querySelectorAll('.error-message, .form-error-message');
        errorMessages.forEach(msg => msg.remove());

        // Remove other symptom input if it exists
        const otherInput = document.getElementById('otherSymptomInput');
        if (otherInput) {
            otherInput.remove();
        }
    }
}

// Initialize AOS animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});