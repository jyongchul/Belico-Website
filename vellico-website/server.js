const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3060; // Use environment port or default

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
    res.json({
        totalInquiries: 127,
        satisfiedCustomers: 98.5,
        responseTime: '평균 2시간',
        currentDate: new Date().toLocaleDateString('ko-KR')
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`벨리코 웹사이트가 http://localhost:${PORT}에서 실행 중입니다.`);
});

module.exports = app;