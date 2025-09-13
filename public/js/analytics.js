// Analytics dashboard functionality

// Initialize analytics dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadRealTimeStats();
    initializeCharts();
    loadDetailedAnalytics();

    // Update real-time stats every 30 seconds
    setInterval(loadRealTimeStats, 30000);
});

// Load real-time statistics
function loadRealTimeStats() {
    // Simulate real-time data (in production, this would fetch from analytics API)
    const stats = {
        realtime: Math.floor(Math.random() * 50) + 10,
        today: Math.floor(Math.random() * 500) + 200,
        monthly: Math.floor(Math.random() * 10000) + 5000,
        total: Math.floor(Math.random() * 50000) + 25000
    };

    updateStatCards(stats);
}

// Update stat cards with animation
function updateStatCards(stats) {
    const cards = {
        'realtimeVisitors': stats.realtime,
        'todayVisitors': stats.today,
        'monthlyVisitors': stats.monthly.toLocaleString(),
        'totalVisitors': stats.total.toLocaleString()
    };

    Object.entries(cards).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            animateCounter(element, value);
        }
    });
}

// Animate counter with counting effect
function animateCounter(element, targetValue) {
    const current = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const target = typeof targetValue === 'string' ?
        parseInt(targetValue.replace(/,/g, '')) : targetValue;

    const increment = Math.max(1, Math.floor((target - current) / 20));
    let currentValue = current;

    const timer = setInterval(() => {
        if (currentValue < target) {
            currentValue += increment;
            if (currentValue > target) currentValue = target;

            element.textContent = typeof targetValue === 'string' ?
                currentValue.toLocaleString() : currentValue;
        } else {
            clearInterval(timer);
            element.textContent = typeof targetValue === 'string' ?
                target.toLocaleString() : target;
        }
    }, 50);
}

// Initialize charts
function initializeCharts() {
    initVisitorsChart();
    initPageViewsChart();
    initTrafficSourceChart();
    initDeviceChart();
}

// Visitors trend chart
function initVisitorsChart() {
    const ctx = document.getElementById('visitorsChart');
    if (!ctx) return;

    const data = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [{
            label: '방문자 수',
            data: [245, 320, 280, 410, 380, 290, 350],
            borderColor: '#2c5aa0',
            backgroundColor: 'rgba(44, 90, 160, 0.1)',
            tension: 0.4,
            fill: true
        }]
    };

    new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Page views chart
function initPageViewsChart() {
    const ctx = document.getElementById('pageViewsChart');
    if (!ctx) return;

    const data = {
        labels: ['홈', '제품소개', '대리점', '후기', '예약', '문의'],
        datasets: [{
            label: '페이지 조회수',
            data: [1200, 800, 600, 450, 720, 380],
            backgroundColor: [
                '#2c5aa0',
                '#1e3f70',
                '#4a6fa5',
                '#6b7db8',
                '#8c95c5',
                '#adb3d2'
            ]
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Traffic source chart
function initTrafficSourceChart() {
    const ctx = document.getElementById('trafficSourceChart');
    if (!ctx) return;

    const data = {
        labels: ['검색엔진', '소셜미디어', '직접방문', '광고', '기타'],
        datasets: [{
            data: [45, 20, 25, 7, 3],
            backgroundColor: [
                '#2c5aa0',
                '#1e3f70',
                '#4a6fa5',
                '#6b7db8',
                '#8c95c5'
            ]
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Device chart
function initDeviceChart() {
    const ctx = document.getElementById('deviceChart');
    if (!ctx) return;

    const data = {
        labels: ['모바일', '데스크톱', '태블릿'],
        datasets: [{
            data: [67, 28, 5],
            backgroundColor: [
                '#2c5aa0',
                '#1e3f70',
                '#4a6fa5'
            ]
        }]
    };

    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Load detailed analytics data
function loadDetailedAnalytics() {
    loadPopularPages();
    loadVisitorRegions();
}

// Load popular pages data
function loadPopularPages() {
    const pages = [
        { page: '홈 페이지', views: 1200, avgTime: '2:45', bounceRate: '35%' },
        { page: '제품소개', views: 800, avgTime: '3:20', bounceRate: '42%' },
        { page: '대리점 찾기', views: 600, avgTime: '1:55', bounceRate: '28%' },
        { page: '예약하기', views: 720, avgTime: '4:10', bounceRate: '25%' },
        { page: '이용후기', views: 450, avgTime: '2:15', bounceRate: '38%' }
    ];

    const tbody = document.getElementById('popularPages');
    if (!tbody) return;

    tbody.innerHTML = pages.map(page => `
        <tr>
            <td>${page.page}</td>
            <td>${page.views.toLocaleString()}</td>
            <td>${page.avgTime}</td>
            <td>${page.bounceRate}</td>
        </tr>
    `).join('');
}

// Load visitor regions data
function loadVisitorRegions() {
    const regions = [
        { region: '서울', visitors: 850, percentage: '34%' },
        { region: '부산', visitors: 420, percentage: '17%' },
        { region: '대구', visitors: 320, percentage: '13%' },
        { region: '인천', visitors: 280, percentage: '11%' },
        { region: '광주', visitors: 180, percentage: '7%' },
        { region: '대전', visitors: 150, percentage: '6%' },
        { region: '기타', visitors: 300, percentage: '12%' }
    ];

    const tbody = document.getElementById('visitorRegions');
    if (!tbody) return;

    tbody.innerHTML = regions.map(region => `
        <tr>
            <td>${region.region}</td>
            <td>${region.visitors.toLocaleString()}</td>
            <td>${region.percentage}</td>
        </tr>
    `).join('');
}

// Analytics configuration functions
function configureGA() {
    const gaId = prompt('Google Analytics 측정 ID를 입력하세요 (예: GA_MEASUREMENT_ID):');
    if (gaId) {
        alert(`Google Analytics가 ${gaId}로 설정되었습니다.\n실제 구현에서는 서버에 저장됩니다.`);
        console.log('GA configured:', gaId);
    }
}

function configureFB() {
    const pixelId = prompt('Facebook Pixel ID를 입력하세요:');
    if (pixelId) {
        alert(`Facebook Pixel이 ${pixelId}로 설정되었습니다.\n실제 구현에서는 서버에 저장됩니다.`);
        console.log('FB Pixel configured:', pixelId);
    }
}

function configureNaver() {
    const naverId = prompt('네이버 애널리틱스 ID를 입력하세요:');
    if (naverId) {
        alert(`네이버 애널리틱스가 ${naverId}로 설정되었습니다.\n실제 구현에서는 서버에 저장됩니다.`);
        console.log('Naver Analytics configured:', naverId);

        // Update status
        const statusElement = document.querySelector('.config-card:nth-child(3) .config-status');
        if (statusElement) {
            statusElement.textContent = '활성화됨';
            statusElement.className = 'config-status active';
        }
    }
}

function configureHeatmap() {
    const service = prompt('히트맵 서비스를 선택하세요:\n1. Hotjar\n2. Crazy Egg\n3. Microsoft Clarity\n\n번호를 입력하세요:');

    const services = {
        '1': 'Hotjar',
        '2': 'Crazy Egg',
        '3': 'Microsoft Clarity'
    };

    if (services[service]) {
        alert(`${services[service]} 히트맵이 설정되었습니다.\n실제 구현에서는 서버에 저장됩니다.`);
        console.log('Heatmap configured:', services[service]);

        // Update status
        const statusElement = document.querySelector('.config-card:nth-child(4) .config-status');
        if (statusElement) {
            statusElement.textContent = '활성화됨';
            statusElement.className = 'config-status active';
        }
    }
}

// Event tracking functions
function trackEvent(eventName, parameters = {}) {
    // Google Analytics event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, parameters);
    }

    // Facebook Pixel event tracking
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, parameters);
    }

    console.log('Event tracked:', eventName, parameters);
}

// Custom event tracking for business goals
function trackReservation() {
    trackEvent('reservation_started', {
        event_category: 'engagement',
        event_label: 'reservation_form'
    });
}

function trackConsultation() {
    trackEvent('consultation_request', {
        event_category: 'lead',
        event_label: 'contact_form'
    });
}

function trackProductView(productType) {
    trackEvent('view_item', {
        event_category: 'ecommerce',
        event_label: productType,
        item_category: 'insole'
    });
}

function trackDealerSearch(location) {
    trackEvent('search', {
        event_category: 'engagement',
        search_term: location,
        event_label: 'dealer_search'
    });
}

// Export analytics data
function exportAnalyticsData(format = 'csv') {
    const data = {
        visitors: {
            today: document.getElementById('todayVisitors').textContent,
            monthly: document.getElementById('monthlyVisitors').textContent,
            total: document.getElementById('totalVisitors').textContent
        },
        timestamp: new Date().toISOString()
    };

    if (format === 'csv') {
        downloadCSV(data);
    } else if (format === 'json') {
        downloadJSON(data);
    }
}

function downloadCSV(data) {
    const csv = `날짜,오늘 방문자,월간 방문자,총 방문자\n${new Date().toLocaleDateString()},${data.visitors.today},${data.visitors.monthly},${data.visitors.total}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function downloadJSON(data) {
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Integration with reservation system
document.addEventListener('DOMContentLoaded', function() {
    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });

    // Track form interactions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const formName = this.id || 'unknown_form';
            trackEvent('form_submit', {
                event_category: 'engagement',
                event_label: formName
            });
        });
    });

    // Track button clicks
    const buttons = document.querySelectorAll('button, .btn-primary, .btn-secondary');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('button_click', {
                event_category: 'engagement',
                event_label: buttonText
            });
        });
    });
});