// Chat feature functionality
document.addEventListener('DOMContentLoaded', () => {
    // Chat elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatNavLink = document.getElementById('chat-nav-link');
    const chatContainer = document.getElementById('chat-container');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    
    // Check if chat elements exist
    if (!chatToggle || !chatContainer || !chatClose || !chatInput || !chatSend || !chatMessages) {
        console.warn('Chat elements not found in the DOM');
        return;
    }
    
    // Toggle chat visibility
    function toggleChat() {
        chatContainer.classList.toggle('active');
        if (chatContainer.classList.contains('active')) {
            chatInput.focus();
            // Scroll to bottom of messages
            setTimeout(() => {
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 100);
        }
    }
    
    // Event listeners for both toggle methods
    if (chatToggle) {
        chatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleChat();
        });
    }
    
    if (chatNavLink) {
        chatNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleChat();
        });
    }
    
    // Close chat
    if (chatClose) {
        chatClose.addEventListener('click', (e) => {
            e.stopPropagation();
            chatContainer.classList.remove('active');
        });
    }
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (chatContainer.classList.contains('active') && 
            !chatContainer.contains(e.target) && 
            e.target !== chatToggle && 
            e.target !== chatNavLink) {
            chatContainer.classList.remove('active');
        }
    });
    
    // Send message on button click
    if (chatSend) {
        chatSend.addEventListener('click', (e) => {
            e.preventDefault();
            sendMessage();
        });
    }
    
    // Send message on Enter key
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }
    
    // Function to send a message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            
            // Clear input
            chatInput.value = '';
            
            // Simulate bot response after a short delay
            setTimeout(() => {
                const botResponse = generateBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        }
    }
    
    // Function to add a message to the chat
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        messageElement.textContent = text;
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom of messages
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
    
    // Function to generate bot responses
    function generateBotResponse(userMessage) {
        const responses = [
            "I understand your question about '" + userMessage + "'. How can I help you further?",
            "Thanks for your message! Our team will get back to you soon.",
            "That's an interesting point. Can you tell me more about what you're looking for?",
            "I'm here to help with any questions about our educational resources.",
            "For specific course information, you can browse through the different year sections.",
            "If you need help uploading resources, check out the Upload section.",
            "Have you explored our resource library for your courses?",
            "I'm a chat assistant. For more complex queries, please contact our support team."
        ];
        
        // Check for specific keywords in user message
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return "Hello! Welcome to the Educational Resource Library. How can I assist you today?";
        } else if (lowerMessage.includes('course') || lowerMessage.includes('class')) {
            return "We have courses organized by academic year. You can select your year to view available courses and resources.";
        } else if (lowerMessage.includes('upload') || lowerMessage.includes('resource')) {
            return "You can upload resources using the Upload button in the navigation menu. What type of resource would you like to share?";
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMessage.includes('help')) {
            return "I can help you navigate our educational resource library. You can browse courses by year, upload resources, or search for specific topics.";
        } else if (lowerMessage.includes('year')) {
            return "Our library is organized by academic years. Select your year to see relevant courses and resources.";
        } else if (lowerMessage.includes('search')) {
            return "You can use the search bar at the top to find specific resources, courses, or topics.";
        } else if (lowerMessage.includes('admin')) {
            return "For administrative tasks, please contact the system administrator.";
        } else if (lowerMessage.includes('login') || lowerMessage.includes('account')) {
            return "If you're having trouble with your account, please visit the login page or contact support.";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return "Goodbye! Feel free to chat with me again if you have any questions.";
        }
        
        // Return a random response
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Add welcome message
    setTimeout(() => {
        addMessage("Welcome to the Educational Resource Library chat! How can I help you today?", 'bot');
    }, 500);
    
    // Theme change listener to update chat styles
    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                // Theme has changed, update chat styles if needed
                const currentTheme = document.documentElement.getAttribute('data-theme');
                console.log('Theme changed to:', currentTheme);
            }
        });
    });
    
    // Observe theme changes
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});