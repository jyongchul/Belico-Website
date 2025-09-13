// Real-time chat support functionality

// Chat widget state
let chatWidget = null;
let chatMessages = [];
let isConnected = false;
let chatUser = {
    id: null,
    name: null,
    email: null
};

// Initialize chat widget
document.addEventListener('DOMContentLoaded', function() {
    createChatWidget();
    setupChatEvents();

    // Auto-open chat if there's a pending message or it's first visit
    setTimeout(() => {
        if (shouldAutoOpenChat()) {
            openChat();
        }
    }, 3000);
});

// Create chat widget HTML
function createChatWidget() {
    const chatHTML = `
        <div id="chatWidget" class="chat-widget">
            <!-- Chat Button -->
            <div id="chatButton" class="chat-button" onclick="toggleChat()">
                <span class="chat-icon">💬</span>
                <span class="chat-text">상담</span>
                <div id="chatNotification" class="chat-notification" style="display: none;">1</div>
            </div>

            <!-- Chat Window -->
            <div id="chatWindow" class="chat-window" style="display: none;">
                <!-- Chat Header -->
                <div class="chat-header">
                    <div class="chat-header-info">
                        <div class="operator-avatar">👩‍💼</div>
                        <div class="operator-details">
                            <div class="operator-name">벨리코 상담사</div>
                            <div class="operator-status" id="operatorStatus">온라인</div>
                        </div>
                    </div>
                    <div class="chat-header-actions">
                        <button class="chat-minimize" onclick="minimizeChat()">−</button>
                        <button class="chat-close" onclick="closeChat()">×</button>
                    </div>
                </div>

                <!-- Chat Messages -->
                <div class="chat-messages" id="chatMessages">
                    <div class="welcome-message">
                        <div class="message operator-message">
                            <div class="message-content">
                                안녕하세요! 벨리코 맞춤형 깔창 상담사입니다.<br>
                                족부 건강 관련해서 궁금한 점이 있으시면 언제든지 문의해주세요! 😊
                            </div>
                            <div class="message-time">${getCurrentTime()}</div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="chat-quick-actions" id="chatQuickActions">
                    <button class="quick-action" onclick="sendQuickMessage('족저근막염 상담하고 싶어요')">
                        족저근막염 상담
                    </button>
                    <button class="quick-action" onclick="sendQuickMessage('예약하고 싶어요')">
                        예약 문의
                    </button>
                    <button class="quick-action" onclick="sendQuickMessage('가격이 궁금해요')">
                        가격 문의
                    </button>
                </div>

                <!-- User Info Form -->
                <div class="chat-user-form" id="chatUserForm">
                    <div class="form-title">상담을 위해 간단한 정보를 입력해주세요</div>
                    <input type="text" id="chatUserName" placeholder="성함" required>
                    <input type="tel" id="chatUserPhone" placeholder="연락처" required>
                    <button onclick="submitUserInfo()" class="btn-submit">시작하기</button>
                </div>

                <!-- Chat Input -->
                <div class="chat-input-container" id="chatInputContainer" style="display: none;">
                    <div class="chat-input-wrapper">
                        <textarea id="chatInput" placeholder="메시지를 입력하세요..." rows="1"></textarea>
                        <button id="sendButton" onclick="sendMessage()" disabled>
                            <span class="send-icon">📤</span>
                        </button>
                    </div>
                    <div class="chat-input-footer">
                        <span class="typing-indicator" id="typingIndicator" style="display: none;">
                            상담사가 입력 중입니다...
                        </span>
                    </div>
                </div>

                <!-- File Upload -->
                <div class="chat-file-upload" id="chatFileUpload" style="display: none;">
                    <input type="file" id="fileInput" accept="image/*,.pdf,.doc,.docx" multiple>
                    <div class="file-upload-text">이미지나 문서를 첨부해주세요</div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);
    chatWidget = document.getElementById('chatWidget');
}

// Setup chat event listeners
function setupChatEvents() {
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';

        // Enable/disable send button
        sendButton.disabled = !this.value.trim();
    });

    // Send on Enter (Shift+Enter for new line)
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Phone number formatting
    const phoneInput = document.getElementById('chatUserPhone');
    phoneInput.addEventListener('input', function() {
        formatPhoneNumber(this);
    });

    // File upload
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileUpload);
}

// Toggle chat window
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const isVisible = chatWindow.style.display !== 'none';

    if (isVisible) {
        closeChat();
    } else {
        openChat();
    }
}

// Open chat
function openChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatButton');
    const chatNotification = document.getElementById('chatNotification');

    chatWindow.style.display = 'block';
    chatButton.classList.add('chat-open');
    chatNotification.style.display = 'none';

    // Focus on appropriate input
    if (chatUser.id) {
        document.getElementById('chatInput').focus();
    } else {
        document.getElementById('chatUserName').focus();
    }

    // Mark as opened
    localStorage.setItem('chatOpened', 'true');
}

// Close chat
function closeChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatButton = document.getElementById('chatButton');

    chatWindow.style.display = 'none';
    chatButton.classList.remove('chat-open');
}

// Minimize chat
function minimizeChat() {
    closeChat();
}

// Submit user information
function submitUserInfo() {
    const name = document.getElementById('chatUserName').value.trim();
    const phone = document.getElementById('chatUserPhone').value.trim();

    if (!name || !phone) {
        alert('성함과 연락처를 모두 입력해주세요.');
        return;
    }

    if (!isValidPhone(phone)) {
        alert('올바른 연락처를 입력해주세요.');
        return;
    }

    // Save user info
    chatUser.id = generateUserId();
    chatUser.name = name;
    chatUser.phone = phone;

    // Hide user form, show chat
    document.getElementById('chatUserForm').style.display = 'none';
    document.getElementById('chatInputContainer').style.display = 'block';
    document.getElementById('chatQuickActions').style.display = 'flex';

    // Send welcome message with user info
    addSystemMessage(`${name}님, 안녕하세요! 상담을 시작하겠습니다.`);

    // Connect to operator (simulation)
    connectToOperator();

    // Focus on chat input
    document.getElementById('chatInput').focus();
}

// Send message
function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    addMessage(message, 'user');

    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    document.getElementById('sendButton').disabled = true;

    // Hide quick actions after first message
    const quickActions = document.getElementById('chatQuickActions');
    if (quickActions.style.display !== 'none') {
        quickActions.style.display = 'none';
    }

    // Show typing indicator
    showTypingIndicator();

    // Simulate operator response
    setTimeout(() => {
        hideTypingIndicator();
        handleOperatorResponse(message);
    }, 1000 + Math.random() * 2000);
}

// Send quick message
function sendQuickMessage(message) {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = message;
    sendMessage();
}

// Add message to chat
function addMessage(content, sender, timestamp = null) {
    const messagesContainer = document.getElementById('chatMessages');
    const time = timestamp || getCurrentTime();

    const messageHTML = `
        <div class="message ${sender}-message">
            <div class="message-content">${content}</div>
            <div class="message-time">${time}</div>
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();

    // Store message
    chatMessages.push({
        content: content,
        sender: sender,
        timestamp: time
    });
}

// Add system message
function addSystemMessage(content) {
    const messagesContainer = document.getElementById('chatMessages');

    const messageHTML = `
        <div class="system-message">
            <div class="system-message-content">${content}</div>
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
    scrollToBottom();
}

// Handle operator response (simulation)
function handleOperatorResponse(userMessage) {
    const message = userMessage.toLowerCase();
    let response = '';

    if (message.includes('족저근막염')) {
        response = '족저근막염으로 고생하고 계시는군요. 벨리코의 맞춤형 깔창은 족저근막염 완화에 매우 효과적입니다. 3D 스캔을 통해 개인별 발 형태를 정확히 분석하여 제작합니다. 상담 예약을 도와드릴까요?';
    } else if (message.includes('예약')) {
        response = '예약 도움을 드리겠습니다! 희망하시는 지역이 어디신가요? 현재 서울, 부산, 대구, 인천, 수원, 송도에 대리점이 있습니다. 예약 페이지로 안내해드릴 수도 있어요.';
    } else if (message.includes('가격') || message.includes('비용')) {
        response = '벨리코 맞춤형 깔창 가격 안내해드리겠습니다.<br><br>• 기본 상담: 무료<br>• 3D 스캔 분석: 10,000원<br>• 맞춤형 깔창 제작: 80,000~150,000원<br><br>개인별 증상과 요구사항에 따라 가격이 달라질 수 있습니다. 정확한 견적은 상담 후 안내해드립니다.';
    } else if (message.includes('평발') || message.includes('무지외반증')) {
        response = `${message.includes('평발') ? '평발' : '무지외반증'} 교정을 위한 맞춤형 깔창 문의해주셨네요. 벨리코는 각 증상에 특화된 깔창을 제작합니다. 전문 상담을 통해 정확한 진단과 치료 계획을 세워드립니다. 가까운 대리점으로 방문 상담을 권해드려요.`;
    } else if (message.includes('안녕') || message.includes('시작')) {
        response = '네, 안녕하세요! 벨리코 상담사입니다. 어떤 도움이 필요하신지 말씀해주세요. 족부 건강, 맞춤형 깔창, 예약 등 무엇이든 문의하실 수 있어요! 😊';
    } else {
        response = '말씀해주신 내용을 확인했습니다. 더 자세한 상담을 위해 전문 상담사와 연결해드리거나 직접 방문 상담을 권해드립니다. 예약을 도와드릴까요?';
    }

    addMessage(response, 'operator');

    // Add follow-up options
    if (message.includes('족저근막염') || message.includes('평발') || message.includes('무지외반증')) {
        setTimeout(() => {
            addQuickResponseOptions([
                '예약하고 싶어요',
                '다른 증상도 있어요',
                '가격이 궁금해요'
            ]);
        }, 1000);
    }
}

// Add quick response options
function addQuickResponseOptions(options) {
    const messagesContainer = document.getElementById('chatMessages');

    const optionsHTML = `
        <div class="quick-responses">
            ${options.map(option => `
                <button class="quick-response" onclick="sendQuickMessage('${option}')">
                    ${option}
                </button>
            `).join('')}
        </div>
    `;

    messagesContainer.insertAdjacentHTML('beforeend', optionsHTML);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'block';
}

// Hide typing indicator
function hideTypingIndicator() {
    const indicator = document.getElementById('typingIndicator');
    indicator.style.display = 'none';
}

// Connect to operator (simulation)
function connectToOperator() {
    isConnected = true;
    document.getElementById('operatorStatus').textContent = '온라인';
    document.getElementById('operatorStatus').style.color = '#28a745';

    // Save conversation start
    saveChatSession();
}

// Scroll to bottom of messages
function scrollToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Generate user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Validate phone number
function isValidPhone(phone) {
    const phoneRegex = /^01[0-9]-?\d{4}-?\d{4}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Format phone number
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

// Handle file upload
function handleFileUpload(event) {
    const files = event.target.files;

    for (let file of files) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert(`${file.name} 파일이 너무 큽니다. 5MB 이하의 파일을 선택해주세요.`);
            continue;
        }

        // Add file message
        addFileMessage(file);
    }

    // Clear input
    event.target.value = '';
}

// Add file message
function addFileMessage(file) {
    const fileName = file.name;
    const fileSize = (file.size / 1024 / 1024).toFixed(2) + 'MB';

    const content = `
        <div class="file-attachment">
            <div class="file-icon">📎</div>
            <div class="file-info">
                <div class="file-name">${fileName}</div>
                <div class="file-size">${fileSize}</div>
            </div>
        </div>
    `;

    addMessage(content, 'user');

    // Simulate operator response
    setTimeout(() => {
        addMessage('파일을 확인했습니다. 관련 내용을 검토해보고 답변드리겠습니다.', 'operator');
    }, 1500);
}

// Should auto-open chat
function shouldAutoOpenChat() {
    const hasOpened = localStorage.getItem('chatOpened');
    const currentPage = window.location.pathname;

    // Auto-open on reservation page or if user seems stuck
    return !hasOpened && (
        currentPage.includes('reservation') ||
        currentPage.includes('products') ||
        document.referrer.includes('google.com')
    );
}

// Save chat session
function saveChatSession() {
    const sessionData = {
        userId: chatUser.id,
        userName: chatUser.name,
        userPhone: chatUser.phone,
        startTime: new Date().toISOString(),
        messages: chatMessages,
        page: window.location.pathname
    };

    // In real implementation, send to server
    console.log('Chat session saved:', sessionData);
    localStorage.setItem('chatSession', JSON.stringify(sessionData));
}

// Show notification
function showChatNotification() {
    const notification = document.getElementById('chatNotification');
    notification.style.display = 'block';

    // Auto-hide after 10 seconds
    setTimeout(() => {
        notification.style.display = 'none';
    }, 10000);
}

// Chat widget auto-positioning
function adjustChatPosition() {
    const widget = document.getElementById('chatWidget');
    const button = document.getElementById('chatButton');

    // Avoid covering important elements
    const importantElements = document.querySelectorAll('.btn-primary, .contact-info');
    let bottomOffset = 20;

    importantElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (rect.bottom > viewportHeight - 100) {
            bottomOffset = Math.max(bottomOffset, viewportHeight - rect.top + 20);
        }
    });

    widget.style.bottom = bottomOffset + 'px';
}

// Initialize chat positioning
document.addEventListener('DOMContentLoaded', function() {
    adjustChatPosition();

    // Readjust on scroll and resize
    window.addEventListener('scroll', adjustChatPosition);
    window.addEventListener('resize', adjustChatPosition);
});

// Show welcome notification after page load
setTimeout(() => {
    if (!localStorage.getItem('chatOpened')) {
        showChatNotification();
    }
}, 5000);