const express = require('express');
const path = require('path');
const app = express();
const PORT = 3060; // Safe port not in use

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: '벨리코 맞춤형 깔창 - 개인 맞춤 발 건강 솔루션',
        description: '3D 스캔 기술로 제작하는 맞춤형 깔창, 벨리코'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`벨리코 웹사이트가 http://localhost:${PORT}에서 실행 중입니다.`);
});

module.exports = app;