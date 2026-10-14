/* ============================================================
   SimpleChat — WebSocket Chat
   ============================================================ */

// ---------- DOM References ----------
const messageDisplay = document.getElementById('messageDisplay');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const emptyPlaceholder = document.getElementById('emptyPlaceholder');

const connectionStatus = document.getElementById('connectionStatus');
const currentUsername = document.getElementById('currentUsername');
const chatStatusNote = document.getElementById('chatStatusNote');

// ---------- State ----------
let messages = [];
let nextMessageId = 1;

let stompClient = null;
let username = 'User' + Math.floor(Math.random() * 1000);

// ---------- Update Connection Status ----------
function updateConnectionStatus(status, note) {
  if (connectionStatus) {
    connectionStatus.textContent = status;
  }

  if (chatStatusNote) {
    chatStatusNote.textContent = note;
  }
}

// ---------- Helper: Format Time ----------
function formatTime(date) {
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

// ---------- Render Message ----------
function renderMessage(message) {
  if (emptyPlaceholder && emptyPlaceholder.parentNode) {
    emptyPlaceholder.remove();
  }

  const row = document.createElement('div');
  row.className = `message-row ${message.direction}`;
  row.dataset.messageId = message.id;

  const meta = document.createElement('div');
  meta.className = 'message-meta';

  const usernameSpan = document.createElement('span');
  usernameSpan.className = 'message-username';
  usernameSpan.textContent = message.username;

  const timeSpan = document.createElement('span');
  timeSpan.className = 'message-time';
  timeSpan.textContent = formatTime(message.timestamp);

  meta.appendChild(usernameSpan);
  meta.appendChild(timeSpan);

  const bubble = document.createElement('div');
  bubble.className = 'message-bubble';
  bubble.textContent = message.text;

  row.appendChild(meta);
  row.appendChild(bubble);

  messageDisplay.appendChild(row);
}

// ---------- Scroll to Latest Message ----------
function scrollToLatest() {
  requestAnimationFrame(() => {
    messageDisplay.scrollTop = messageDisplay.scrollHeight;
  });
}

// ---------- Add Message ----------
function addMessage({ username: sender, text, direction }) {
  if (!text || text.trim() === '') {
    return;
  }

  const message = {
    id: nextMessageId++,
    username: sender,
    text: text.trim(),
    timestamp: new Date(),
    direction: direction
  };

  messages.push(message);
  renderMessage(message);
  scrollToLatest();
}

// ---------- Connect to Backend ----------
function connectWebSocket() {
  updateConnectionStatus('Connecting...', 'Connecting to chat server...');

  const client = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/chat',
    reconnectDelay: 5000,

    onConnect: () => {
      console.log('Connected to SimpleChat backend!');

      updateConnectionStatus('Connected', 'You are connected to the chat server.');

      if (currentUsername) {
        currentUsername.textContent = username;
      }

      client.subscribe('/topic/messages', (frame) => {
        const message = JSON.parse(frame.body);

        addMessage({
          username: message.sender,
          text: message.content,
          direction: message.sender === username ? 'outgoing' : 'incoming'
        });
      });
    },

    onStompError: (frame) => {
      console.error('STOMP error:', frame.headers['message'] || frame.body);

      updateConnectionStatus('Server Error', 'The chat server reported an error.');
    },

    onWebSocketError: (error) => {
      console.error('WebSocket connection error:', error);

      updateConnectionStatus('Connection Error', 'Could not connect to the chat server.');
    },

    onWebSocketClose: () => {
      console.log('WebSocket connection closed.');

      updateConnectionStatus('Disconnected', 'Connection lost. Reconnecting...');
    }
  });

  stompClient = client;
  client.activate();
}

// ---------- Send Message ----------
function sendCurrentUserMessage() {
  const rawText = messageInput.value.trim();

  if (!rawText) {
    return;
  }

  if (!stompClient || !stompClient.connected) {
    console.error('Not connected to the backend yet.');
    updateConnectionStatus('Disconnected', 'Message not sent. Waiting for connection...');
    return;
  }

  const chatMessage = {
    sender: username,
    content: rawText
  };

  stompClient.publish({
    destination: '/app/sendMessage',
    body: JSON.stringify(chatMessage)
  });

  messageInput.value = '';
  messageInput.style.height = 'auto';
  messageInput.focus();
}

// ---------- Handle Keyboard Input ----------
function handleInputKeydown(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    sendCurrentUserMessage();
  }
}

// ---------- Auto-resize Input ----------
function autoResizeInput() {
  this.style.height = 'auto';
  this.style.height = Math.min(this.scrollHeight, 120) + 'px';
}

// ---------- Initialize Application ----------
function init() {
  if (currentUsername) {
    currentUsername.textContent = username;
  }

  connectWebSocket();

  sendButton.addEventListener('click', sendCurrentUserMessage);
  messageInput.addEventListener('keydown', handleInputKeydown);
  messageInput.addEventListener('input', autoResizeInput);

  messageInput.focus();
}

// ---------- Start Application ----------
document.addEventListener('DOMContentLoaded', init);