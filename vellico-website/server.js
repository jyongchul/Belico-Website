const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3060; // Use environment port or default

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = 'public/images/new-folder/';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        // Keep original filename with timestamp prefix to avoid conflicts
        const timestamp = Date.now();
        const originalName = file.originalname;
        cb(null, `${timestamp}-${originalName}`);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: function (req, file, cb) {
        // Allow only image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: '벨리코 맞춤형 깔창 - 개인 맞춤 발 건강 솔루션',
        description: '3D 스캔 기술로 제작하는 맞춤형 깔창, 벨리코'
    });
});

// Contact form submission
app.post('/contact', (req, res) => {
    const { name, phone, consultationType, message } = req.body;
    
    // 간단한 유효성 검사
    if (!name || !phone || !consultationType) {
        return res.status(400).json({ 
            success: false, 
            message: '필수 항목을 모두 입력해주세요.' 
        });
    }
    
    // 실제 구현에서는 여기에 데이터베이스 저장, 이메일 발송 등의 로직 추가
    console.log('새로운 문의가 접수되었습니다:');
    console.log(`성함: ${name}`);
    console.log(`연락처: ${phone}`);
    console.log(`상담 유형: ${consultationType}`);
    console.log(`문의 내용: ${message || '없음'}`);
    console.log(`접수 시간: ${new Date().toLocaleString('ko-KR')}`);
    console.log('---');
    
    res.json({ 
        success: true, 
        message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내 연락드리겠습니다.' 
    });
});

// API route for customer inquiry statistics (예시 동적 기능)
app.get('/api/stats', (req, res) => {
    // 실제 구현에서는 데이터베이스에서 실시간 데이터를 가져옴
    const now = new Date();
    const baseInquiries = 127;
    const dailyVariation = Math.floor(Math.random() * 5); // 일일 변동
    
    res.json({
        totalInquiries: baseInquiries + dailyVariation,
        satisfiedCustomers: (98.2 + Math.random() * 0.6).toFixed(1),
        responseTime: '평균 ' + (1.5 + Math.random() * 1).toFixed(1) + '시간',
        currentDate: now.toLocaleDateString('ko-KR'),
        lastUpdated: now.toLocaleTimeString('ko-KR')
    });
});

// API route for recent activity (새로운 기능)
app.get('/api/recent-activity', (req, res) => {
    const activities = [
        { type: 'inquiry', message: '족저근막염 상담 문의', time: '5분 전' },
        { type: 'order', message: '맞춤 깔창 주문 완료', time: '12분 전' },
        { type: 'consultation', message: '평발 교정 상담 완료', time: '23분 전' },
        { type: 'inquiry', message: '스포츠용 깔창 문의', time: '35분 전' },
        { type: 'review', message: '고객 후기 등록', time: '48분 전' }
    ];
    
    // 랜덤하게 3-5개 활동 반환
    const randomActivities = activities
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 3);
    
    res.json({
        activities: randomActivities,
        totalToday: Math.floor(Math.random() * 15) + 8
    });
});

// API route for customer testimonials rotation (새로운 기능)
app.get('/api/testimonials', (req, res) => {
    const testimonials = [
        {
            name: "김○○",
            age: 38,
            occupation: "회사원",
            rating: 5,
            comment: "평발이라서 항상 발이 아팠는데, 벨리코 깔창 끼고부터 하루 종일 걸어도 발이 편해요.",
            date: "2024.09.10"
        },
        {
            name: "이○○", 
            age: 45,
            occupation: "교사",
            rating: 5,
            comment: "처음엔 가격이 비싸 망설였지만 직접 써보니 무릎 통증이 줄어서 투자할 가치가 있었습니다.",
            date: "2024.09.08"
        },
        {
            name: "박○○",
            age: 29,
            occupation: "은행원", 
            rating: 5,
            comment: "제 발에 꼭 맞게 만들어주니까 오래 서 있어도 피로감이 덜해요.",
            date: "2024.09.05"
        },
        {
            name: "최○○",
            age: 33,
            occupation: "마라토너",
            rating: 5,
            comment: "마라톤 할 때 무릎 부담이 확실히 줄어들었어요. 기록도 향상됐습니다!",
            date: "2024.09.03"
        }
    ];
    
    // 랜덤하게 2개 후기 반환
    const randomTestimonials = testimonials
        .sort(() => Math.random() - 0.5)
        .slice(0, 2);
    
    res.json({
        testimonials: randomTestimonials,
        totalCount: 156
    });
});

// File upload endpoint for admin
app.post('/upload', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: '업로드할 파일을 선택해주세요.' 
            });
        }

        const uploadedFiles = req.files.map(file => ({
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            path: `/images/new-folder/${file.filename}`
        }));

        console.log('새로운 파일이 업로드되었습니다:');
        uploadedFiles.forEach((file, index) => {
            console.log(`${index + 1}. ${file.originalName} → ${file.filename} (${(file.size / 1024).toFixed(2)} KB)`);
        });

        res.json({
            success: true,
            message: `${req.files.length}개 파일이 성공적으로 업로드되었습니다.`,
            files: uploadedFiles
        });

    } catch (error) {
        console.error('파일 업로드 오류:', error);
        res.status(500).json({
            success: false,
            message: '파일 업로드 중 오류가 발생했습니다.'
        });
    }
});

// API to list uploaded files in new-folder
app.get('/api/new-folder-files', (req, res) => {
    try {
        const folderPath = path.join(__dirname, 'public/images/new-folder');
        
        if (!fs.existsSync(folderPath)) {
            return res.json({ files: [] });
        }

        const files = fs.readdirSync(folderPath)
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(filename => {
                const filePath = path.join(folderPath, filename);
                const stats = fs.statSync(filePath);
                return {
                    filename,
                    path: `/images/new-folder/${filename}`,
                    size: stats.size,
                    uploadedAt: stats.ctime.toLocaleString('ko-KR')
                };
            })
            .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));

        res.json({
            success: true,
            count: files.length,
            files
        });

    } catch (error) {
        console.error('파일 목록 조회 오류:', error);
        res.status(500).json({
            success: false,
            message: '파일 목록을 조회할 수 없습니다.'
        });
    }
});

// Admin page for file upload
app.get('/admin', (req, res) => {
    res.render('admin', {
        title: '벨리코 관리자 - 파일 업로드',
        description: '새 폴더 이미지 업로드'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`벨리코 웹사이트가 http://localhost:${PORT}에서 실행 중입니다.`);
});

module.exports = app;