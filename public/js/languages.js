// Multi-language support for Belico website
// Supported languages: Korean, English, Japanese, Chinese (Simplified), Chinese (Traditional), Vietnamese, Spanish

const languages = {
    ko: {
        name: "한국어",
        flag: "🇰🇷",
        // Navigation
        nav_home: "홈",
        nav_products: "제품소개",
        nav_dealers: "전국 대리점",
        nav_reviews: "이용후기",
        nav_reservation: "예약하기",
        nav_contact: "문의하기",

        // Meta
        page_title: "벨리코 (BELICO) - 전문 맞춤형 깔창 솔루션",
        page_description: "3D 스캔 기술과 첨단 장비로 제작하는 개인 맞춤형 깔창. 전문 상담부터 제작까지 원스톱 서비스",

        // Hero Section
        hero_badge: "의료진 인정 • 98% 고객 만족도",
        hero_problem: "발 통증 때문에 고생하고 계신가요?",
        hero_solution: "15분 만에 완성되는<br><span class='highlight'>맞춤형 깔창</span>으로 해결하세요",
        hero_subtitle_conditions: "족저근막염 • 평발 • 무지외반증",
        hero_subtitle_tech: "의료기기급 3D 스캔 기술로 <span class='text-emphasis'>0.1mm 정밀도</span>의 개인 맞춤형 깔창을 현장에서 즉석 제작",

        // Statistics
        stat_cases: "제작 경험",
        stat_improvement: "개선 효과",
        stat_completion: "즉석 완성",

        // Technology Features
        tech_title: "벨리코 3대 핵심 기술",
        tech_heel: "뒤꿈치 정렬 교정",
        tech_arch: "아치 서포트",
        tech_shock: "충격흡수 & 압력분산",

        // CTA Buttons
        cta_booking_main: "무료 족부 분석 예약",
        cta_booking_sub: "상담부터 제작까지 45분 완료",
        call_time: "평일 09:00-18:00 즉시 상담",

        // Guarantee
        guarantee_text: "<strong>만족 보장:</strong> 착용 후 불편하시면 100% 재제작",

        // Floating Cards
        pressure_analysis: "실시간 압력 분석",
        pressure_desc: "발바닥 압력을 실시간으로 측정하여 최적의 깔창 설계",
        scan_tech: "3D 스캔 기술",
        scan_desc: "0.1mm 정밀도로 발 모양을 정확히 스캔",
        instant_production: "즉석 제작",
        instant_desc: "현장에서 바로 제작하여 즉시 착용 가능",

        // Image Overlay
        professional_equipment: "의료기기급 전문 장비"
    },

    en: {
        name: "English",
        flag: "🇺🇸",
        // Navigation
        nav_home: "Home",
        nav_products: "Products",
        nav_dealers: "Dealers",
        nav_reviews: "Reviews",
        nav_reservation: "Booking",
        nav_contact: "Contact",

        // Meta
        page_title: "BELICO - Professional Custom Orthotic Insoles",
        page_description: "Individual custom insoles made with 3D scanning technology and advanced equipment. One-stop service from consultation to production",

        // Hero Section
        hero_badge: "Medical Recognition • 98% Customer Satisfaction",
        hero_problem: "Suffering from foot pain?",
        hero_solution: "<span class='highlight'>Custom insoles</span><br>completed in just 15 minutes",
        hero_subtitle_conditions: "Plantar Fasciitis • Flat Feet • Bunions",
        hero_subtitle_tech: "Medical-grade 3D scanning technology creates custom insoles with <span class='text-emphasis'>0.1mm precision</span> on-site",

        // Statistics
        stat_cases: "Cases Completed",
        stat_improvement: "Improvement Rate",
        stat_completion: "Instant Completion",

        // Technology Features
        tech_title: "BELICO's 3 Core Technologies",
        tech_heel: "Heel Alignment Correction",
        tech_arch: "Arch Support",
        tech_shock: "Shock Absorption & Pressure Distribution",

        // CTA Buttons
        cta_booking_main: "Free Foot Analysis Booking",
        cta_booking_sub: "Complete consultation to production in 45 minutes",
        call_time: "Weekdays 09:00-18:00 Immediate Consultation",

        // Guarantee
        guarantee_text: "<strong>Satisfaction Guarantee:</strong> 100% remake if uncomfortable after wearing",

        // Floating Cards
        pressure_analysis: "Real-time Pressure Analysis",
        pressure_desc: "Real-time foot pressure measurement for optimal insole design",
        scan_tech: "3D Scanning Technology",
        scan_desc: "Accurate foot shape scanning with 0.1mm precision",
        instant_production: "Instant Production",
        instant_desc: "Made on-site for immediate use",

        // Image Overlay
        professional_equipment: "Medical-grade Professional Equipment"
    },

    ja: {
        name: "日本語",
        flag: "🇯🇵",
        // Navigation
        nav_home: "ホーム",
        nav_products: "製品紹介",
        nav_dealers: "全国代理店",
        nav_reviews: "利用者の声",
        nav_reservation: "予約",
        nav_contact: "お問い合わせ",

        // Meta
        page_title: "ベリコ (BELICO) - 専門オーダーメイドインソール",
        page_description: "3Dスキャン技術と最先端機器で製作する個人オーダーメイドインソール。専門相談から製作まで一貫サービス",

        // Hero Section
        hero_badge: "医療従事者認定 • 98%顧客満足度",
        hero_problem: "足の痛みでお悩みですか？",
        hero_solution: "15分で完成する<br><span class='highlight'>オーダーメイドインソール</span>で解決",
        hero_subtitle_conditions: "足底筋膜炎 • 偏平足 • 外反母趾",
        hero_subtitle_tech: "医療機器レベルの3Dスキャン技術で<span class='text-emphasis'>0.1mm精度</span>の個人オーダーメイドインソールを現場で即座製作",

        // Statistics
        stat_cases: "製作実績",
        stat_improvement: "改善効果",
        stat_completion: "即座完成",

        // Technology Features
        tech_title: "ベリコ3大核心技術",
        tech_heel: "かかと配列矯正",
        tech_arch: "アーチサポート",
        tech_shock: "衝撃吸収・圧力分散",

        // CTA Buttons
        cta_booking_main: "無料足部分析予約",
        cta_booking_sub: "相談から製作まで45分完了",
        call_time: "平日09:00-18:00即時相談",

        // Guarantee
        guarantee_text: "<strong>満足保証:</strong> 着用後ご不満な場合100%再製作",

        // Floating Cards
        pressure_analysis: "リアルタイム圧力分析",
        pressure_desc: "足裏圧力をリアルタイムで測定し最適なインソール設計",
        scan_tech: "3Dスキャン技術",
        scan_desc: "0.1mm精度で足の形を正確にスキャン",
        instant_production: "即座製作",
        instant_desc: "現場で即座製作、すぐ着用可能",

        // Image Overlay
        professional_equipment: "医療機器レベル専門装備"
    },

    "zh-CN": {
        name: "简体中文",
        flag: "🇨🇳",
        // Navigation
        nav_home: "首页",
        nav_products: "产品介绍",
        nav_dealers: "全国经销商",
        nav_reviews: "用户评价",
        nav_reservation: "预约",
        nav_contact: "联系我们",

        // Meta
        page_title: "贝利科 (BELICO) - 专业定制鞋垫解决方案",
        page_description: "采用3D扫描技术和尖端设备制作的个人定制鞋垫。从专业咨询到制作的一站式服务",

        // Hero Section
        hero_badge: "医疗认证 • 98%客户满意度",
        hero_problem: "因足部疼痛而困扰吗？",
        hero_solution: "15分钟完成的<br><span class='highlight'>定制鞋垫</span>为您解决",
        hero_subtitle_conditions: "足底筋膜炎 • 扁平足 • 拇外翻",
        hero_subtitle_tech: "医疗级3D扫描技术以<span class='text-emphasis'>0.1mm精度</span>现场即时制作个人定制鞋垫",

        // Statistics
        stat_cases: "制作经验",
        stat_improvement: "改善效果",
        stat_completion: "即时完成",

        // Technology Features
        tech_title: "贝利科3大核心技术",
        tech_heel: "脚跟对齐矫正",
        tech_arch: "足弓支撑",
        tech_shock: "冲击吸收与压力分散",

        // CTA Buttons
        cta_booking_main: "免费足部分析预约",
        cta_booking_sub: "从咨询到制作45分钟完成",
        call_time: "工作日09:00-18:00即时咨询",

        // Guarantee
        guarantee_text: "<strong>满意保证：</strong> 穿着后不适100%重新制作",

        // Floating Cards
        pressure_analysis: "实时压力分析",
        pressure_desc: "实时测量足底压力，设计最佳鞋垫",
        scan_tech: "3D扫描技术",
        scan_desc: "0.1mm精度准确扫描足部形状",
        instant_production: "即时制作",
        instant_desc: "现场制作，即刻穿着",

        // Image Overlay
        professional_equipment: "医疗级专业设备"
    },

    "zh-TW": {
        name: "繁體中文",
        flag: "🇹🇼",
        // Navigation
        nav_home: "首頁",
        nav_products: "產品介紹",
        nav_dealers: "全國經銷商",
        nav_reviews: "使用者評價",
        nav_reservation: "預約",
        nav_contact: "聯絡我們",

        // Meta
        page_title: "貝利科 (BELICO) - 專業客製化鞋墊解決方案",
        page_description: "採用3D掃描技術和尖端設備製作的個人客製化鞋墊。從專業諮詢到製作的一站式服務",

        // Hero Section
        hero_badge: "醫療認證 • 98%顧客滿意度",
        hero_problem: "因足部疼痛而困擾嗎？",
        hero_solution: "15分鐘完成的<br><span class='highlight'>客製化鞋墊</span>為您解決",
        hero_subtitle_conditions: "足底筋膜炎 • 扁平足 • 拇指外翻",
        hero_subtitle_tech: "醫療級3D掃描技術以<span class='text-emphasis'>0.1mm精度</span>現場即時製作個人客製化鞋墊",

        // Statistics
        stat_cases: "製作經驗",
        stat_improvement: "改善效果",
        stat_completion: "即時完成",

        // Technology Features
        tech_title: "貝利科3大核心技術",
        tech_heel: "腳跟對齊矯正",
        tech_arch: "足弓支撐",
        tech_shock: "衝擊吸收與壓力分散",

        // CTA Buttons
        cta_booking_main: "免費足部分析預約",
        cta_booking_sub: "從諮詢到製作45分鐘完成",
        call_time: "平日09:00-18:00即時諮詢",

        // Guarantee
        guarantee_text: "<strong>滿意保證：</strong> 穿著後不適100%重新製作",

        // Floating Cards
        pressure_analysis: "即時壓力分析",
        pressure_desc: "即時測量足底壓力，設計最佳鞋墊",
        scan_tech: "3D掃描技術",
        scan_desc: "0.1mm精度準確掃描足部形狀",
        instant_production: "即時製作",
        instant_desc: "現場製作，即刻穿著",

        // Image Overlay
        professional_equipment: "醫療級專業設備"
    },

    vi: {
        name: "Tiếng Việt",
        flag: "🇻🇳",
        // Navigation
        nav_home: "Trang chủ",
        nav_products: "Sản phẩm",
        nav_dealers: "Đại lý toàn quốc",
        nav_reviews: "Đánh giá",
        nav_reservation: "Đặt lịch",
        nav_contact: "Liên hệ",

        // Meta
        page_title: "BELICO - Giải pháp lót giày chỉnh hình chuyên nghiệp",
        page_description: "Lót giày cá nhân hóa được chế tạo bằng công nghệ quét 3D và thiết bị tiên tiến. Dịch vụ một cửa từ tư vấn đến sản xuất",

        // Hero Section
        hero_badge: "Được y tế công nhận • 98% khách hàng hài lòng",
        hero_problem: "Đang gặp khó khăn vì đau chân?",
        hero_solution: "<span class='highlight'>Lót giày đo riêng</span><br>hoàn thành trong 15 phút",
        hero_subtitle_conditions: "Viêm cân gan chân • Bàn chân bẹt • Bốc mắt cá",
        hero_subtitle_tech: "Công nghệ quét 3D cấp y tế tạo lót giày cá nhân với <span class='text-emphasis'>độ chính xác 0.1mm</span> ngay tại chỗ",

        // Statistics
        stat_cases: "Kinh nghiệm chế tạo",
        stat_improvement: "Hiệu quả cải thiện",
        stat_completion: "Hoàn thành tức thì",

        // Technology Features
        tech_title: "3 công nghệ cốt lõi của BELICO",
        tech_heel: "Chỉnh hình gót chân",
        tech_arch: "Hỗ trợ vòm chân",
        tech_shock: "Hấp thụ sốc & phân tán áp lực",

        // CTA Buttons
        cta_booking_main: "Đặt lịch phân tích chân miễn phí",
        cta_booking_sub: "Hoàn thành từ tư vấn đến sản xuất trong 45 phút",
        call_time: "Thứ 2-6 09:00-18:00 Tư vấn ngay",

        // Guarantee
        guarantee_text: "<strong>Bảo đảm hài lòng:</strong> 100% làm lại nếu không thoải mái sau khi đeo",

        // Floating Cards
        pressure_analysis: "Phân tích áp lực theo thời gian thực",
        pressure_desc: "Đo áp lực lòng bàn chân theo thời gian thực để thiết kế lót giày tối ưu",
        scan_tech: "Công nghệ quét 3D",
        scan_desc: "Quét chính xác hình dạng bàn chân với độ chính xác 0.1mm",
        instant_production: "Sản xuất tức thì",
        instant_desc: "Chế tạo ngay tại chỗ, có thể đeo ngay",

        // Image Overlay
        professional_equipment: "Thiết bị chuyên nghiệp cấp y tế"
    },

    es: {
        name: "Español",
        flag: "🇪🇸",
        // Navigation
        nav_home: "Inicio",
        nav_products: "Productos",
        nav_dealers: "Distribuidores",
        nav_reviews: "Reseñas",
        nav_reservation: "Reserva",
        nav_contact: "Contacto",

        // Meta
        page_title: "BELICO - Solución Profesional de Plantillas Ortopédicas Personalizadas",
        page_description: "Plantillas personalizadas individuales hechas con tecnología de escaneo 3D y equipos avanzados. Servicio integral desde consulta hasta producción",

        // Hero Section
        hero_badge: "Reconocimiento Médico • 98% Satisfacción del Cliente",
        hero_problem: "¿Sufres de dolor en los pies?",
        hero_solution: "<span class='highlight'>Plantillas personalizadas</span><br>completadas en solo 15 minutos",
        hero_subtitle_conditions: "Fascitis Plantar • Pies Planos • Juanetes",
        hero_subtitle_tech: "Tecnología de escaneo 3D de grado médico crea plantillas personalizadas con <span class='text-emphasis'>precisión de 0.1mm</span> en el sitio",

        // Statistics
        stat_cases: "Experiencia en Fabricación",
        stat_improvement: "Tasa de Mejora",
        stat_completion: "Terminación Instantánea",

        // Technology Features
        tech_title: "3 Tecnologías Centrales de BELICO",
        tech_heel: "Corrección de Alineación del Talón",
        tech_arch: "Soporte del Arco",
        tech_shock: "Absorción de Impactos y Distribución de Presión",

        // CTA Buttons
        cta_booking_main: "Reserva de Análisis de Pies Gratuito",
        cta_booking_sub: "Consulta completa a producción en 45 minutos",
        call_time: "Días laborables 09:00-18:00 Consulta Inmediata",

        // Guarantee
        guarantee_text: "<strong>Garantía de Satisfacción:</strong> 100% rehacer si es incómodo después de usar",

        // Floating Cards
        pressure_analysis: "Análisis de Presión en Tiempo Real",
        pressure_desc: "Medición de presión del pie en tiempo real para diseño óptimo de plantillas",
        scan_tech: "Tecnología de Escaneo 3D",
        scan_desc: "Escaneo preciso de la forma del pie con precisión de 0.1mm",
        instant_production: "Producción Instantánea",
        instant_desc: "Hecho en el sitio para uso inmediato",

        // Image Overlay
        professional_equipment: "Equipo Profesional de Grado Médico"
    }
};

// Current language state
let currentLanguage = 'ko';

// Function to get text by key for current language
function getText(key) {
    return languages[currentLanguage][key] || languages['ko'][key] || key;
}

// Function to change language
function changeLanguage(langCode) {
    if (languages[langCode]) {
        currentLanguage = langCode;
        updatePageContent();
        localStorage.setItem('belico_language', langCode);

        // Update HTML lang attribute
        document.documentElement.lang = langCode;

        // Update page title and meta
        document.title = getText('page_title');
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = getText('page_description');
        }
    }
}

// Function to update all page content
function updatePageContent() {
    // Update all elements with data-text attributes
    document.querySelectorAll('[data-text]').forEach(element => {
        const key = element.getAttribute('data-text');
        const text = getText(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.innerHTML = text;
        }
    });

    // Update language selector display
    updateLanguageSelector();
}

// Function to update language selector
function updateLanguageSelector() {
    const currentLangDisplay = document.querySelector('.current-language');
    if (currentLangDisplay) {
        const lang = languages[currentLanguage];
        currentLangDisplay.innerHTML = `${lang.flag} ${lang.name}`;
    }

    // Update active state in dropdown
    document.querySelectorAll('.language-option').forEach(option => {
        const langCode = option.getAttribute('data-lang');
        option.classList.toggle('active', langCode === currentLanguage);
    });
}

// Initialize language system
function initLanguageSystem() {
    // Get saved language or use default
    const savedLanguage = localStorage.getItem('belico_language') || 'ko';
    changeLanguage(savedLanguage);

    // Set up language selector event listeners
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.getAttribute('data-lang');
            changeLanguage(langCode);

            // Close dropdown
            const dropdown = document.querySelector('.language-dropdown');
            if (dropdown) {
                dropdown.classList.remove('active');
            }
        });
    });

    // Set up language selector toggle
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.querySelector('.language-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
            dropdown.classList.remove('active');
        }
    });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { languages, getText, changeLanguage, initLanguageSystem };
}