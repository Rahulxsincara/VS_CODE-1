// Preset practice patterns
const presetPatterns = {
    "left-right": {
        name: "Left-Right Alternation",
        keys: ["a", "s", "d", "f", "j", "k", "l", ";"],
        description: "Practice alternating between left and right hand keys"
    },
    "ring-pinky": {
        name: "Ring-Pinky Finger Stretch",
        keys: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        description: "Improve stretching between ring and pinky fingers"
    },
    "top-row": {
        name: "Top Row Challenge",
        keys: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        description: "Master the challenging top row keys"
    },
    "bottom-row": {
        name: "Bottom Row Challenge",
        keys: ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
        description: "Practice the bottom row keys"
    }
};

// Symbol groups
const symbolGroups = {
    "brackets": {
        name: "Brackets",
        keys: ["[", "]", "{", "}", "(", ")"],
        description: "Practice bracket typing"
    },
    "quotes": {
        name: "Quotes",
        keys: ["'", '"', "`"],
        description: "Master different quote marks"
    },
    "math": {
        name: "Math Symbols",
        keys: ["+", "-", "*", "/", "=", "<", ">"],
        description: "Practice mathematical operators"
    },
    "punctuation": {
        name: "Punctuation",
        keys: [".", ",", ";", ":", "!", "?"],
        description: "Improve punctuation typing"
    }
};

// Commonly mistaken key pairs
const commonMistakes = [
    ["q", "w"],
    ["e", "r"],
    ["t", "y"],
    ["u", "i"],
    ["o", "p"],
    ["a", "s"],
    ["d", "f"],
    ["g", "h"],
    ["j", "k"],
    ["l", ";"],
    ["z", "x"],
    ["c", "v"],
    ["b", "n"],
    ["m", ","]
];

let selectedKeys = [];
let practiceText = "";
let timer = null;
let timeLeft = 60;
let totalTime = 60;
let isPracticeActive = false;
let isPracticePaused = false;
let startTime = null;
let correctCharacters = 0;
let incorrectCharacters = 0;
let currentPracticeType = "specific";

// DOM Elements
const typeButtons = document.querySelectorAll('.type-btn');
const specificKeysSection = document.getElementById('specificKeysSection');
const commonMistakesSection = document.getElementById('commonMistakesSection');
const symbolsSection = document.getElementById('symbolsSection');
const keyOptions = document.querySelectorAll('.key-option');
const selectedKeysContainer = document.getElementById('selectedKeysContainer');
const clearSelectionBtn = document.getElementById('clearSelection');
const patternOptions = document.querySelectorAll('.pattern-option');
const startCustomPracticeBtn = document.getElementById('startCustomPractice');
const practiceArea = document.getElementById('practiceArea');
const resultsArea = document.getElementById('resultsArea');
const textDisplay = document.getElementById('textDisplay');
const textInput = document.getElementById('textInput');
const timerElement = document.getElementById('timer');
const wpmElement = document.getElementById('wpm');
const accuracyElement = document.getElementById('accuracy');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const practiceTimeInput = document.getElementById('practiceTime');
const textLengthSelect = document.getElementById('textLength');
const repeatKeysSelect = document.getElementById('repeatKeys');
const difficultySelect = document.getElementById('difficulty');
const highlightedKeys = document.getElementById('highlightedKeys');
const practicedKeysElement = document.getElementById('practicedKeys');
const avgWpmElement = document.getElementById('avgWpm');
const finalAccuracyElement = document.getElementById('finalAccuracy');
const improvementElement = document.getElementById('improvement');
const tipsList = document.getElementById('tipsList');
const practiceAgainBtn = document.getElementById('practiceAgain');
const createNewBtn = document.getElementById('createNew');

// Initialize the app
function init() {
    setupEventListeners();
    updateStartButtonState();
}

// Set up event listeners
function setupEventListeners() {
    // Practice type selection
    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentPracticeType = button.dataset.type;
            showRelevantSection();
        });
    });
    
    // Key selection
    keyOptions.forEach(button => {
        button.addEventListener('click', () => {
            const key = button.dataset.key;
            toggleKeySelection(key, button);
        });
    });
    
    // Clear selection
    clearSelectionBtn.addEventListener('click', clearAllSelections);
    
    // Pattern selection
    patternOptions.forEach(button => {
        button.addEventListener('click', () => {
            patternOptions.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            const pattern = button.dataset.pattern;
            selectPattern(pattern);
        });
    });
    
    // Start practice
    startCustomPracticeBtn.addEventListener('click', startCustomPractice);
    
    // Practice controls
    pauseBtn.addEventListener('click', pausePractice);
    resetBtn.addEventListener('click', resetPractice);
    
    // Text input
    textInput.addEventListener('input', handleInput);
    
    // Results actions
    practiceAgainBtn.addEventListener('click', practiceAgain);
    createNewBtn.addEventListener('click', createNewPractice);
}

// Show relevant section based on practice type
function showRelevantSection() {
    // Hide all sections
    specificKeysSection.classList.add('hidden');
    commonMistakesSection.classList.add('hidden');
    symbolsSection.classList.add('hidden');
    
    // Show relevant section
    if (currentPracticeType === "specific") {
        specificKeysSection.classList.remove('hidden');
    } else if (currentPracticeType === "common") {
        commonMistakesSection.classList.remove('hidden');
    } else if (currentPracticeType === "symbols") {
        symbolsSection.classList.remove('hidden');
    }
    
    updateStartButtonState();
}

// Toggle key selection
function toggleKeySelection(key, button) {
    const index = selectedKeys.indexOf(key);
    if (index === -1) {
        // Add key
        selectedKeys.push(key);
        button.classList.add('selected');
    } else {
        // Remove key
        selectedKeys.splice(index, 1);
        button.classList.remove('selected');
    }
    updateSelectedKeysDisplay();
    updateStartButtonState();
}

// Update selected keys display
function updateSelectedKeysDisplay() {
    if (selectedKeys.length === 0) {
        selectedKeysContainer.innerHTML = '<span class="no-selection">No keys selected yet</span>';
        return;
    }
    
    selectedKeysContainer.innerHTML = '';
    selectedKeys.forEach(key => {
        const keyTag = document.createElement('div');
        keyTag.className = 'selected-key-tag';
        keyTag.innerHTML = `
            ${key.toUpperCase()}
            <button class="remove-key" data-key="${key}">×</button>
        `;
        selectedKeysContainer.appendChild(keyTag);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-key').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const key = button.dataset.key;
            removeKey(key);
        });
    });
}

// Remove a key from selection
function removeKey(key) {
    const index = selectedKeys.indexOf(key);
    if (index !== -1) {
        selectedKeys.splice(index, 1);
        // Update button state
        document.querySelectorAll(`.key-option[data-key="${key}"]`).forEach(button => {
            button.classList.remove('selected');
        });
        updateSelectedKeysDisplay();
        updateStartButtonState();
    }
}

// Clear all selections
function clearAllSelections() {
    selectedKeys = [];
    keyOptions.forEach(button => {
        button.classList.remove('selected');
    });
    patternOptions.forEach(button => {
        button.classList.remove('selected');
    });
    updateSelectedKeysDisplay();
    updateStartButtonState();
}

// Select a pattern
function selectPattern(pattern) {
    let keys = [];
    
    if (currentPracticeType === "common") {
        keys = presetPatterns[pattern].keys;
    } else if (currentPracticeType === "symbols") {
        keys = symbolGroups[pattern].keys;
    }
    
    // Clear previous selections
    clearAllSelections();
    
    // Select new keys
    selectedKeys = [...keys];
    keys.forEach(key => {
        document.querySelectorAll(`.key-option[data-key="${key}"]`).forEach(button => {
            button.classList.add('selected');
        });
    });
    
    updateSelectedKeysDisplay();
    updateStartButtonState();
}

// Update start button state
function updateStartButtonState() {
    if (selectedKeys.length > 0) {
        startCustomPracticeBtn.disabled = false;
    } else {
        startCustomPracticeBtn.disabled = true;
    }
}

// Generate practice text based on selected keys
function generatePracticeText() {
    if (selectedKeys.length === 0) return "";
    
    const textLength = getTextLength();
    let text = "";
    
    // Get settings
    const repeatLevel = repeatKeysSelect.value;
    const difficulty = difficultySelect.value;
    
    // Generate text based on settings
    for (let i = 0; i < textLength; i++) {
        // Determine how many keys to combine
        let keyCount = 1;
        if (difficulty === "medium") {
            keyCount = Math.floor(Math.random() * 2) + 1; // 1-2 keys
        } else if (difficulty === "hard") {
            keyCount = Math.floor(Math.random() * 3) + 1; // 1-3 keys
        }
        
        // Select keys
        let combo = "";
        for (let j = 0; j < keyCount; j++) {
            const randomIndex = Math.floor(Math.random() * selectedKeys.length);
            combo += selectedKeys[randomIndex];
        }
        
        text += combo;
        
        // Add space occasionally
        if (Math.random() > 0.7 && i < textLength - 1) {
            text += " ";
        }
    }
    
    return text;
}

// Get text length based on selection
function getTextLength() {
    const selection = textLengthSelect.value;
    switch (selection) {
        case "short": return 50;
        case "medium": return 100;
        case "long": return 200;
        default: return 100;
    }
}

// Start custom practice
function startCustomPractice() {
    if (selectedKeys.length === 0) return;
    
    // Hide setup, show practice area
    document.querySelector('.practice-setup').classList.add('hidden');
    practiceArea.classList.remove('hidden');
    
    // Generate practice text
    practiceText = generatePracticeText();
    renderText();
    
    // Set up timer
    totalTime = parseInt(practiceTimeInput.value);
    timeLeft = totalTime;
    timerElement.textContent = timeLeft;
    
    // Display highlighted keys
    displayHighlightedKeys();
    
    // Reset stats
    correctCharacters = 0;
    incorrectCharacters = 0;
    updateStats();
    
    // Focus on text input
    textInput.value = "";
    textInput.disabled = false;
    textInput.focus();
    
    // Start timer
    startTimer();
    
    isPracticeActive = true;
    isPracticePaused = false;
}

// Display highlighted keys
function displayHighlightedKeys() {
    highlightedKeys.innerHTML = "";
    selectedKeys.forEach(key => {
        const keyElement = document.createElement('div');
        keyElement.className = 'highlight-key';
        keyElement.textContent = key.toUpperCase();
        highlightedKeys.appendChild(keyElement);
    });
}

// Render the text with character spans
function renderText() {
    textDisplay.innerHTML = '';
    for (let i = 0; i < practiceText.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.innerText = practiceText[i];
        charSpan.className = 'character';
        // Add highlight class for selected keys
        if (selectedKeys.includes(practiceText[i])) {
            charSpan.classList.add('highlight');
        }
        textDisplay.appendChild(charSpan);
    }
    // Add a cursor indicator to the first character if there is text
    if (textDisplay.firstChild) {
        textDisplay.firstChild.classList.add('current');
    }
}

// Start timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        if (!isPracticePaused) {
            timeLeft--;
            timerElement.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                endPractice();
            }
        }
    }, 1000);
}

// Pause practice
function pausePractice() {
    if (!isPracticeActive) return;
    
    isPracticePaused = !isPracticePaused;
    
    if (isPracticePaused) {
        pauseBtn.innerHTML = '<i class="fas fa-play"></i> Resume';
    } else {
        pauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
    }
}

// Reset practice
function resetPractice() {
    clearInterval(timer);
    isPracticeActive = false;
    isPracticePaused = false;
    
    // Show setup, hide practice area
    document.querySelector('.practice-setup').classList.remove('hidden');
    practiceArea.classList.add('hidden');
    resultsArea.classList.add('hidden');
    
    // Clear selections
    clearAllSelections();
    
    // Reset type buttons
    typeButtons.forEach(btn => btn.classList.remove('active'));
    typeButtons[0].classList.add('active');
    currentPracticeType = "specific";
    showRelevantSection();
}

// Handle user input
function handleInput() {
    if (!isPracticeActive || isPracticePaused) return;
    
    const userInput = textInput.value;
    const characterSpans = textDisplay.querySelectorAll('.character');
    
    // Reset current character highlight
    characterSpans.forEach(span => {
        span.classList.remove('current');
    });
    
    correctCharacters = 0;
    incorrectCharacters = 0;
    
    // Compare each character and apply styling
    for (let i = 0; i < characterSpans.length; i++) {
        const characterSpan = characterSpans[i];
        if (!characterSpan) continue;
        
        // Reset classes but keep highlight if it's a target key
        characterSpan.className = 'character';
        if (selectedKeys.includes(characterSpan.innerText)) {
            characterSpan.classList.add('highlight');
        }
        
        // If we haven't reached this character yet, skip
        if (i >= userInput.length) continue;
        
        // Check if character is correct
        if (userInput[i] === practiceText[i]) {
            characterSpan.classList.remove('highlight');
            characterSpan.classList.add('correct');
            correctCharacters++;
        } else {
            characterSpan.classList.remove('highlight');
            characterSpan.classList.add('incorrect');
            incorrectCharacters++;
        }
    }
    
    // Highlight current character (the next one to type)
    if (userInput.length < characterSpans.length && characterSpans[userInput.length]) {
        characterSpans[userInput.length].classList.add('current');
    }
    
    // Calculate and update stats
    updateStats();
    
    // Check if practice is complete
    if (userInput.length === practiceText.length) {
        endPractice();
    }
}

// Update statistics display
function updateStats() {
    // Calculate WPM (words per minute)
    // Standard: 5 characters = 1 word
    const wordsTyped = correctCharacters / 5;
    const timeElapsed = totalTime - timeLeft;
    const wpm = timeElapsed > 0 ? Math.round(wordsTyped / (timeElapsed / 60)) : 0;
    
    // Calculate accuracy
    const totalChars = correctCharacters + incorrectCharacters;
    const accuracy = totalChars > 0 ? Math.round((correctCharacters / totalChars) * 100) : 100;
    
    // Update display
    wpmElement.textContent = isNaN(wpm) ? 0 : wpm;
    accuracyElement.textContent = accuracy;
}

// End practice
function endPractice() {
    isPracticeActive = false;
    isPracticePaused = false;
    clearInterval(timer);
    textInput.disabled = true;
    
    // Calculate final results
    const userInput = textInput.value;
    correctCharacters = 0;
    incorrectCharacters = 0;
    
    for (let i = 0; i < userInput.length; i++) {
        if (userInput[i] === practiceText[i]) {
            correctCharacters++;
        } else {
            incorrectCharacters++;
        }
    }
    
    // Calculate final WPM
    const wordsTyped = correctCharacters / 5;
    const timeTaken = totalTime - timeLeft;
    const finalWpm = timeTaken > 0 ? Math.round(wordsTyped / (timeTaken / 60)) : 0;
    
    // Calculate final accuracy
    const totalChars = correctCharacters + incorrectCharacters;
    const finalAccuracy = totalChars > 0 ? Math.round((correctCharacters / totalChars) * 100) : 100;
    
    // Display results
    showResults(finalWpm, finalAccuracy);
}

// Show results
function showResults(wpm, accuracy) {
    // Hide practice area, show results
    practiceArea.classList.add('hidden');
    resultsArea.classList.remove('hidden');
    
    // Display results
    practicedKeysElement.textContent = selectedKeys.join(", ").toUpperCase();
    avgWpmElement.textContent = wpm;
    finalAccuracyElement.textContent = accuracy + "%";
    
    // Calculate improvement (simplified)
    const improvement = Math.max(0, accuracy - 80);
    improvementElement.textContent = improvement > 0 ? `+${improvement}%` : "0%";
    
    // Generate tips
    generateTips(accuracy);
    
    // Scroll to results
    resultsArea.scrollIntoView({ behavior: 'smooth' });
}

// Generate improvement tips
function generateTips(accuracy) {
    tipsList.innerHTML = "";
    
    if (accuracy < 70) {
        addTip("Focus on accuracy over speed. Slow down and type each key correctly.");
        addTip("Practice the same keys daily for 10-15 minutes to build muscle memory.");
        addTip("Try typing without looking at the keyboard to improve touch typing.");
    } else if (accuracy < 90) {
        addTip("You're doing well! Try increasing the difficulty level for more challenge.");
        addTip("Focus on the keys you're getting wrong most often.");
        addTip("Practice for longer sessions to build endurance.");
    } else {
        addTip("Excellent work! You've mastered these keys. Try adding more challenging keys.");
        addTip("Maintain this accuracy while gradually increasing your speed.");
        addTip("Try practicing these keys in different combinations for real-world scenarios.");
    }
    
    addTip("Consistent daily practice is more effective than long, infrequent sessions.");
}

// Add a tip to the list
function addTip(text) {
    const li = document.createElement('li');
    li.textContent = text;
    tipsList.appendChild(li);
}

// Practice again with same settings
function practiceAgain() {
    resultsArea.classList.add('hidden');
    practiceArea.classList.remove('hidden');
    
    // Reset practice
    textInput.value = "";
    textInput.disabled = false;
    textInput.focus();
    
    // Reset stats
    correctCharacters = 0;
    incorrectCharacters = 0;
    updateStats();
    
    // Reset timer
    totalTime = parseInt(practiceTimeInput.value);
    timeLeft = totalTime;
    timerElement.textContent = timeLeft;
    
    // Start timer
    startTimer();
    
    isPracticeActive = true;
    isPracticePaused = false;
}

// Create new practice
function createNewPractice() {
    resultsArea.classList.add('hidden');
    document.querySelector('.practice-setup').classList.remove('hidden');
    
    // Clear selections
    clearAllSelections();
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', init);