// Sample texts for different difficulty levels
const texts = {
    easy: [
        "The quick brown fox jumps over the lazy dog. This sentence contains all letters of the alphabet.",
        "Pack my box with five dozen liquor jugs. Sphinx of black quartz, judge my vow.",
        "How vexingly quick daft zebras jump! Bright vixens jump; dozy fowl quack.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
        "The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz."
    ],
    medium: [
        "Programming is the process of creating a set of instructions that tell a computer how to perform a task. JavaScript is a versatile programming language used for web development.",
        "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language like HTML.",
        "Responsive web design makes web pages look good on all devices. Front-end development focuses on the user interface and user experience.",
        "Artificial intelligence is transforming industries by enabling machines to learn from experience and perform human-like tasks.",
        "Cloud computing provides on-demand access to shared pools of configurable computing resources like servers and storage."
    ],
    hard: [
        "The ubiquitous nature of artificial intelligence in contemporary technological landscapes necessitates a comprehensive understanding of its multifaceted implications.",
        "Epistemological discourse concerning computational linguistics often intersects with cognitive science methodologies and philosophical inquiry frameworks.",
        "Quantum computing represents a paradigmatic shift in computational theory, challenging classical algorithmic approaches with probabilistic solutions.",
        "Phenomenological analysis of human-computer interaction reveals intricate layers of perceptual engagement and cognitive processing mechanisms.",
        "The hermeneutic interpretation of machine learning algorithms requires interdisciplinary scholarly collaboration across computer science and philosophy domains."
    ]
};

// Quote collection for quote mode
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Stay hungry, stay foolish. - Steve Jobs",
    "Life is what happens to you while you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you've ever wanted is on the other side of fear. - George Addair",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "The way to get started is to quit talking and begin doing. - Walt Disney"
];

let currentText = "";
let timer = null;
let timeLeft = 60;
let totalTime = 60;
let isTestActive = false;
let isTestPaused = false;
let startTime = null;
let totalCharacters = 0;
let correctCharacters = 0;
let incorrectCharacters = 0;
let totalKeystrokes = 0;
let mode = "time"; // time, words, quote

// DOM Elements
const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const cpmElement = document.getElementById('cpm');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pauseBtn = document.getElementById('pauseBtn');
const difficultySelect = document.getElementById('difficulty');
const timeSelect = document.getElementById('time-select');
const themeSelect = document.getElementById('theme');
const resultsElement = document.getElementById('results');
const finalWpmElement = document.getElementById('finalWpm');
const finalAccuracyElement = document.getElementById('finalAccuracy');
const finalCpmElement = document.getElementById('finalCpm');
const correctCharsElement = document.getElementById('correctChars');
const incorrectCharsElement = document.getElementById('incorrectChars');
const totalCharsTypedElement = document.getElementById('totalCharsTyped');
const retryBtn = document.getElementById('retryBtn');
const progressFill = document.getElementById('progressFill');
const progressPosition = document.getElementById('progressPosition');
const totalCharactersElement = document.getElementById('totalCharacters');
const ratingFill = document.getElementById('ratingFill');
const ratingText = document.getElementById('ratingText');
const modeButtons = document.querySelectorAll('.mode-btn');

// Initialize the app
function init() {
    selectRandomText();
    renderText();
    updateStats();
    
    // Event listeners
    startBtn.addEventListener('click', startTest);
    resetBtn.addEventListener('click', resetTest);
    pauseBtn.addEventListener('click', pauseTest);
    textInput.addEventListener('input', handleInput);
    difficultySelect.addEventListener('change', resetTest);
    timeSelect.addEventListener('change', updateTimeSetting);
    themeSelect.addEventListener('change', changeTheme);
    retryBtn.addEventListener('click', resetTest);
    
    // Mode selection
    modeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            mode = button.dataset.mode;
            resetTest();
        });
    });
}

// Select a random text based on mode and difficulty
function selectRandomText() {
    if (mode === "quote") {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        currentText = quotes[randomIndex];
    } else {
        const difficulty = difficultySelect.value;
        const textsArray = texts[difficulty];
        const randomIndex = Math.floor(Math.random() * textsArray.length);
        currentText = textsArray[randomIndex];
    }
    totalCharacters = currentText.length;
    totalCharactersElement.textContent = totalCharacters;
}

// Render the text with character spans
function renderText() {
    textDisplay.innerHTML = '';
    for (let i = 0; i < currentText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.innerText = currentText[i];
        charSpan.className = 'character';
        if (currentText[i] === ' ') {
            charSpan.classList.add('space');
        }
        textDisplay.appendChild(charSpan);
    }
    // Add a cursor indicator to the first character
    if (textDisplay.firstChild) {
        textDisplay.firstChild.classList.add('current');
    }
}

// Handle user input
function handleInput() {
    if (!isTestActive || isTestPaused) return;
    
    const userInput = textInput.value;
    const characterSpans = textDisplay.querySelectorAll('.character');
    
    // Reset all classes
    characterSpans.forEach(span => {
        span.className = 'character';
        if (span.innerText === ' ') {
            span.classList.add('space');
        }
    });
    
    correctCharacters = 0;
    incorrectCharacters = 0;
    totalKeystrokes = userInput.length;
    
    // Compare each character
    for (let i = 0; i < userInput.length; i++) {
        const characterSpan = characterSpans[i];
        if (!characterSpan) continue;
        
        if (userInput[i] === currentText[i]) {
            characterSpan.classList.add('correct');
            correctCharacters++;
        } else {
            characterSpan.classList.add('incorrect');
            incorrectCharacters++;
        }
    }
    
    // Highlight current character
    if (userInput.length < characterSpans.length) {
        characterSpans[userInput.length].classList.add('current');
        if (characterSpans[userInput.length].innerText === ' ') {
            characterSpans[userInput.length].classList.add('space');
        }
    }
    
    // Update progress
    const progress = (userInput.length / totalCharacters) * 100;
    progressFill.style.width = `${progress}%`;
    progressPosition.textContent = userInput.length;
    
    // Calculate and update stats
    updateStats();
    
    // Check if test is complete
    if (userInput.length === currentText.length) {
        endTest();
    }
}

// Update statistics display
function updateStats() {
    // Calculate WPM (words per minute)
    // Standard: 5 characters = 1 word
    const wordsTyped = correctCharacters / 5;
    const timeElapsed = totalTime - timeLeft;
    const wpm = timeLeft < totalTime && timeElapsed > 0 ? Math.round(wordsTyped / (timeElapsed / 60)) : 0;
    
    // Calculate CPM (characters per minute)
    const cpm = timeElapsed > 0 ? Math.round(correctCharacters / (timeElapsed / 60)) : 0;
    
    // Calculate accuracy
    const totalChars = correctCharacters + incorrectCharacters;
    const accuracy = totalChars > 0 ? Math.round((correctCharacters / totalChars) * 100) : 100;
    
    // Update display
    wpmElement.textContent = isNaN(wpm) ? 0 : wpm;
    accuracyElement.textContent = accuracy;
    cpmElement.textContent = cpm;
}

// Timer function
function startTimer() {
    clearInterval(timer);
    timeLeft = parseInt(timeSelect.value);
    totalTime = timeLeft;
    timerElement.textContent = timeLeft;
    
    timer = setInterval(() => {
        if (!isTestPaused) {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endTest();
            }
        }
    }, 1000);
}

// Start the test
function startTest() {
    if (isTestActive && !isTestPaused) return;
    
    if (!isTestActive) {
        // First start
        isTestActive = true;
        startTime = new Date();
        startTimer();
        textInput.disabled = false;
        textInput.focus();
    } else if (isTestPaused) {
        // Resume from pause
        isTestPaused = false;
        startTimer();
    }
    
    startBtn.innerHTML = '<i class="fas fa-play"></i> Restart';
    pauseBtn.disabled = false;
}

// Pause the test
function pauseTest() {
    if (!isTestActive || isTestPaused) return;
    
    isTestPaused = true;
    clearInterval(timer);
    pauseBtn.disabled = true;
}

// End the test
function endTest() {
    isTestActive = false;
    isTestPaused = false;
    clearInterval(timer);
    textInput.disabled = true;
    
    // Calculate final results
    const userInput = textInput.value;
    correctCharacters = 0;
    incorrectCharacters = 0;
    
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === currentText[i]) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
        }
    }
    
    // Calculate final WPM
    const wordsTyped = correctCharacters / 5;
    const timeTaken = totalTime - timeLeft;
    const finalWpm = timeTaken > 0 ? Math.round(wordsTyped / (timeTaken / 60)) : 0;
    
    // Calculate final CPM
    const finalCpm = timeTaken > 0 ? Math.round(correctCharacters / (timeTaken / 60)) : 0;
    
    // Calculate final accuracy
    const totalChars = correctCharacters + incorrectCharacters;
    const finalAccuracy = totalChars > 0 ? Math.round((correctCharacters / totalChars) * 100) : 100;
    
    // Display results
    finalWpmElement.textContent = finalWpm;
    finalAccuracyElement.textContent = finalAccuracy + '%';
    finalCpmElement.textContent = finalCpm;
    correctCharsElement.textContent = correctCharacters;
    incorrectCharsElement.textContent = incorrectCharacters;
    totalCharsTypedElement.textContent = totalChars;
    
    // Set performance rating
    setPerformanceRating(finalWpm);
    
    resultsElement.style.display = 'block';
    resultsElement.scrollIntoView({ behavior: 'smooth' });
}

// Set performance rating based on WPM
function setPerformanceRating(wpm) {
    let rating = "";
    let percentage = 0;
    
    if (wpm >= 80) {
        rating = "Typing Master";
        percentage = 100;
    } else if (wpm >= 60) {
        rating = "Professional";
        percentage = 80;
    } else if (wpm >= 40) {
        rating = "Intermediate";
        percentage = 60;
    } else if (wpm >= 25) {
        rating = "Beginner";
        percentage = 40;
    } else {
        rating = "Novice";
        percentage = 20;
    }
    
    ratingFill.style.width = `${percentage}%`;
    ratingText.textContent = rating;
}

// Reset the test
function resetTest() {
    clearInterval(timer);
    isTestActive = false;
    isTestPaused = false;
    startTime = null;
    timeLeft = parseInt(timeSelect.value);
    totalTime = timeLeft;
    
    textInput.value = '';
    textInput.disabled = false;
    startBtn.innerHTML = '<i class="fas fa-play"></i> Start';
    pauseBtn.disabled = true;
    timerElement.textContent = timeLeft;
    wpmElement.textContent = '0';
    accuracyElement.textContent = '100';
    cpmElement.textContent = '0';
    resultsElement.style.display = 'none';
    progressFill.style.width = '0%';
    progressPosition.textContent = '0';
    
    selectRandomText();
    renderText();
    updateStats();
    textInput.focus();
}

// Update time setting
function updateTimeSetting() {
    if (!isTestActive) {
        timeLeft = parseInt(timeSelect.value);
        totalTime = timeLeft;
        timerElement.textContent = timeLeft;
    }
}

// Change theme
function changeTheme() {
    const theme = themeSelect.value;
    document.body.className = ''; // Clear existing themes
    if (theme !== 'light') {
        document.body.classList.add(`${theme}-theme`);
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);