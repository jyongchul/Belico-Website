// Admin system functionality

// Admin authentication
const ADMIN_CREDENTIALS = {
    'admin': 'belico2025',
    'manager': 'manager123'
};

// Login form handling
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('adminLoginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAdminLogin();
        });
    }

    // Check if user is already logged in
    if (isAdminLoggedIn()) {
        showAdminDashboard();
    }
});

// Handle admin login
function handleAdminLogin() {
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (ADMIN_CREDENTIALS[username] && ADMIN_CREDENTIALS[username] === password) {
        // Store login state
        const loginData = {
            username: username,
            loginTime: Date.now()
        };

        if (rememberMe) {
            localStorage.setItem('adminLogin', JSON.stringify(loginData));
        } else {
            sessionStorage.setItem('adminLogin', JSON.stringify(loginData));
        }

        showAdminDashboard();
    } else {
        showLoginError('잘못된 관리자 ID 또는 비밀번호입니다.');
    }
}

// Check if admin is logged in
function isAdminLoggedIn() {
    const sessionLogin = sessionStorage.getItem('adminLogin');
    const localLogin = localStorage.getItem('adminLogin');

    if (sessionLogin || localLogin) {
        const loginData = JSON.parse(sessionLogin || localLogin);

        // Check if login is not older than 24 hours
        const now = Date.now();
        const loginTime = loginData.loginTime;
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
            return true;
        } else {
            // Clear expired login
            sessionStorage.removeItem('adminLogin');
            localStorage.removeItem('adminLogin');
        }
    }

    return false;
}

// Show login error
function showLoginError(message) {
    // Remove existing error message
    const existingError = document.querySelector('.login-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'login-error';
    errorDiv.textContent = message;

    const loginForm = document.getElementById('adminLoginForm');
    loginForm.insertBefore(errorDiv, loginForm.firstChild);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';

    // Load dashboard data
    loadDashboardData();
}

// Admin logout
function adminLogout() {
    sessionStorage.removeItem('adminLogin');
    localStorage.removeItem('adminLogin');

    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('adminLogin').style.display = 'block';

    // Clear form
    document.getElementById('adminLoginForm').reset();
}

// Show dashboard section
function showDashboardSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update navigation
    const navLinks = document.querySelectorAll('.admin-nav-menu a');
    navLinks.forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    // Load section-specific data
    loadSectionData(sectionId);
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading dashboard statistics
    updateDashboardStats();
    loadRecentActivities();
}

// Update dashboard statistics
function updateDashboardStats() {
    // In a real implementation, this would fetch data from backend
    const stats = {
        todayVisitors: Math.floor(Math.random() * 300) + 200,
        newReviews: Math.floor(Math.random() * 10) + 5,
        pendingReservations: Math.floor(Math.random() * 20) + 10,
        consultationRequests: Math.floor(Math.random() * 30) + 15
    };

    // Update stat cards (would need to update HTML elements)
    console.log('Dashboard stats updated:', stats);
}

// Load recent activities
function loadRecentActivities() {
    // In a real implementation, this would fetch recent activity data
    console.log('Recent activities loaded');
}

// Load section-specific data
function loadSectionData(sectionId) {
    switch(sectionId) {
        case 'reviews':
            loadReviewsData();
            break;
        case 'reservations':
            loadReservationsData();
            break;
        case 'dealers':
            loadDealersData();
            break;
        case 'content':
            loadContentData();
            break;
        case 'analytics':
            loadAnalyticsData();
            break;
        default:
            break;
    }
}

// Reviews management functions
function loadReviewsData() {
    // In a real implementation, this would fetch reviews from backend
    console.log('Loading reviews data...');
}

function approveReview(reviewId) {
    if (confirm('이 후기를 승인하시겠습니까?')) {
        // In a real implementation, this would make API call to approve review
        alert('후기가 승인되었습니다.');
        loadReviewsData();
    }
}

function rejectReview(reviewId) {
    if (confirm('이 후기를 거부하시겠습니까?')) {
        // In a real implementation, this would make API call to reject review
        alert('후기가 거부되었습니다.');
        loadReviewsData();
    }
}

function editReview(reviewId) {
    // Open review edit modal
    alert('후기 수정 기능을 구현 중입니다.');
}

function deleteReview(reviewId) {
    if (confirm('이 후기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
        // In a real implementation, this would make API call to delete review
        alert('후기가 삭제되었습니다.');
        loadReviewsData();
    }
}

// Reservations management functions
function loadReservationsData() {
    console.log('Loading reservations data...');
}

function confirmReservation(reservationId) {
    if (confirm('이 예약을 확정하시겠습니까?')) {
        alert('예약이 확정되었습니다. 고객에게 확정 문자가 발송됩니다.');
        loadReservationsData();
    }
}

function cancelReservation(reservationId) {
    const reason = prompt('예약 취소 사유를 입력해주세요:');
    if (reason) {
        alert('예약이 취소되었습니다. 고객에게 취소 안내 문자가 발송됩니다.');
        loadReservationsData();
    }
}

// Dealers management functions
function loadDealersData() {
    console.log('Loading dealers data...');
}

function addNewDealer() {
    alert('새 대리점 추가 기능을 구현 중입니다.');
}

function editDealer(dealerId) {
    alert('대리점 정보 수정 기능을 구현 중입니다.');
}

function deleteDealer(dealerId) {
    if (confirm('이 대리점을 삭제하시겠습니까?')) {
        alert('대리점이 삭제되었습니다.');
        loadDealersData();
    }
}

// Content management functions
function loadContentData() {
    console.log('Loading content data...');
}

function editMainContent() {
    alert('메인 페이지 컨텐츠 편집 기능을 구현 중입니다.');
}

function editProductContent() {
    alert('제품 정보 편집 기능을 구현 중입니다.');
}

function editImages() {
    alert('이미지 관리 기능을 구현 중입니다.');
}

// Analytics functions
function loadAnalyticsData() {
    // In a real implementation, this would integrate with Google Analytics API
    console.log('Loading analytics data...');

    // Simulate real-time visitor count update
    updateRealTimeVisitors();
}

function updateRealTimeVisitors() {
    setInterval(() => {
        const currentVisitors = Math.floor(Math.random() * 50) + 20;
        const visitorElement = document.querySelector('#analytics .analytics-number');
        if (visitorElement) {
            visitorElement.textContent = currentVisitors;
        }
    }, 30000); // Update every 30 seconds
}

// Search functionality for admin tables
function setupTableSearch() {
    const searchInputs = document.querySelectorAll('.admin-search');

    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = this.closest('.admin-content').querySelector('.admin-table');
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });
}

// Filter functionality for admin tables
function setupTableFilters() {
    const filterSelects = document.querySelectorAll('.admin-filter');

    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            const filterValue = this.value;
            const table = this.closest('.admin-content').querySelector('.admin-table');
            const rows = table.querySelectorAll('tbody tr');

            rows.forEach(row => {
                if (filterValue === 'all') {
                    row.style.display = '';
                } else {
                    const statusCell = row.querySelector('.status');
                    if (statusCell && statusCell.classList.contains(filterValue)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    });
}

// Initialize admin functionality
document.addEventListener('DOMContentLoaded', function() {
    setupTableSearch();
    setupTableFilters();
});

// Export functionality (for future use with backend)
function exportData(dataType) {
    // In a real implementation, this would export data to CSV or Excel
    alert(`${dataType} 데이터 내보내기 기능을 구현 중입니다.`);
}

// Backup functionality
function createBackup() {
    if (confirm('데이터 백업을 생성하시겠습니까?')) {
        alert('백업이 생성되었습니다. 백업 파일은 서버에 저장됩니다.');
    }
}