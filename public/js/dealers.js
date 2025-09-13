// Dealers page functionality

// Google Maps initialization
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 36.5, lng: 127.5 }, // Center of South Korea
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    // Dealer locations
    const dealers = [
        {
            name: '벨리코 강남점',
            position: { lat: 37.4979, lng: 127.0276 },
            address: '서울특별시 강남구 테헤란로 123',
            phone: '02-1234-5678'
        },
        {
            name: '벨리코 홍대점',
            position: { lat: 37.5563, lng: 126.9223 },
            address: '서울특별시 마포구 홍익로 456',
            phone: '02-2345-6789'
        },
        {
            name: '벨리코 해운대점',
            position: { lat: 35.1796, lng: 129.0756 },
            address: '부산광역시 해운대구 해운대해변로 789',
            phone: '051-3456-7890'
        },
        {
            name: '벨리코 동성로점',
            position: { lat: 35.8714, lng: 128.5911 },
            address: '대구광역시 중구 동성로 101',
            phone: '053-4567-8901'
        },
        {
            name: '벨리코 수원점',
            position: { lat: 37.2636, lng: 127.0286 },
            address: '경기도 수원시 영통구 광교로 202',
            phone: '031-5678-9012'
        },
        {
            name: '벨리코 송도점',
            position: { lat: 37.3886, lng: 126.6519 },
            address: '인천광역시 연수구 송도동 303',
            phone: '032-6789-0123'
        }
    ];

    // Add markers for each dealer
    dealers.forEach(dealer => {
        const marker = new google.maps.Marker({
            position: dealer.position,
            map: map,
            title: dealer.name,
            icon: {
                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="20" cy="20" r="18" fill="#2c5aa0" stroke="#fff" stroke-width="2"/>
                        <text x="20" y="26" text-anchor="middle" fill="white" font-size="12" font-weight="bold">B</text>
                    </svg>
                `),
                scaledSize: new google.maps.Size(40, 40)
            }
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 200px;">
                    <h4 style="margin: 0 0 8px 0; color: #2c5aa0;">${dealer.name}</h4>
                    <p style="margin: 4px 0; font-size: 13px;">📍 ${dealer.address}</p>
                    <p style="margin: 4px 0; font-size: 13px;">📞 ${dealer.phone}</p>
                    <div style="margin-top: 10px;">
                        <button onclick="openKakaoChat('${dealer.name}')"
                                style="background: #2c5aa0; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                            카카오톡 상담
                        </button>
                    </div>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}

// Search functionality
function searchDealers() {
    const searchTerm = document.getElementById('dealerSearch').value.toLowerCase().trim();
    const dealerCards = document.querySelectorAll('.dealer-card');
    const noResults = document.getElementById('noResults');
    let foundResults = false;

    if (searchTerm === '') {
        // Show all dealers if search is empty
        dealerCards.forEach(card => {
            card.style.display = 'block';
        });
        noResults.style.display = 'none';
        return;
    }

    dealerCards.forEach(card => {
        const dealerName = card.querySelector('h3').textContent.toLowerCase();
        const dealerAddress = card.querySelector('.info-item span:nth-child(2)').textContent.toLowerCase();
        const dealerRegion = card.getAttribute('data-region').toLowerCase();

        if (dealerName.includes(searchTerm) ||
            dealerAddress.includes(searchTerm) ||
            dealerRegion.includes(searchTerm)) {
            card.style.display = 'block';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    noResults.style.display = foundResults ? 'none' : 'block';
}

// Filter by region
function filterByRegion(region) {
    const dealerCards = document.querySelectorAll('.dealer-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const noResults = document.getElementById('noResults');

    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    let foundResults = false;

    dealerCards.forEach(card => {
        const cardRegion = card.getAttribute('data-region');

        if (region === 'all' || cardRegion === region) {
            card.style.display = 'block';
            foundResults = true;
        } else {
            card.style.display = 'none';
        }
    });

    noResults.style.display = foundResults ? 'none' : 'block';

    // Clear search input when filtering
    document.getElementById('dealerSearch').value = '';
}

// KakaoTalk consultation
function openKakaoChat(dealerName) {
    // In a real implementation, this would open KakaoTalk chat
    alert(`${dealerName} 카카오톡 상담을 연결합니다.\n\n실제 서비스에서는 카카오톡 채널톡이 열립니다.`);

    // Example of opening KakaoTalk channel (would need actual channel URL)
    // window.open('https://pf.kakao.com/_your_channel_id/chat', '_blank');
}

// Make reservation
function makeReservation(dealerName) {
    // Show reservation modal or redirect to reservation page
    if (confirm(`${dealerName}에 예약하시겠습니까?\n\n예약 시스템으로 이동합니다.`)) {
        // In a real implementation, this would open reservation system
        window.location.href = `#contact?dealer=${encodeURIComponent(dealerName)}`;
    }
}

// Search on Enter key
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('dealerSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchDealers();
            }
        });
    }

    // Add loading state for map
    const mapElement = document.getElementById('map');
    if (mapElement) {
        // Show loading until Google Maps loads
        setTimeout(() => {
            if (typeof google === 'undefined') {
                mapElement.innerHTML = `
                    <div class="map-error">
                        <p>지도를 불러올 수 없습니다.</p>
                        <p>인터넷 연결을 확인해주세요.</p>
                    </div>
                `;
            }
        }, 5000);
    }
});

// Handle Google Maps API load error
window.gm_authFailure = function() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div class="map-error">
                <p>지도 API 키가 필요합니다.</p>
                <p>관리자에게 문의해주세요.</p>
            </div>
        `;
    }
};