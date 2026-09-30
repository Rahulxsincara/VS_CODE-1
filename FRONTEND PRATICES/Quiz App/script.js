// =============================================
// QUIZ APP - Arrays, Functions, DOM
// =============================================

// =============================================
// 1. QUESTIONS ARRAY
// =============================================

const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2 // index of correct answer (Paris)
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1 // Mars
    },
    {
        question: "What is 7 × 8?",
        options: ["48", "54", "56", "64"],
        correct: 2 // 56
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"],
        correct: 2 // Da Vinci
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3 // Pacific
    }
];

// =============================================
// 2. QUIZ STATE VARIABLES
// =============================================

let currentQuestionIndex = 0;  // Which question we're on (0 to 4)
let score = 0;                // Number of correct answers
let selectedOption = null;    // Track selected option
let isAnswered = false;       // Prevent multiple answers

// =============================================
// 3. DOM ELEMENTS
// =============================================

const questionNumber = document.getElementById('questionNumber');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const scoreDisplay = document.getElementById('scoreDisplay');
const questionArea = document.getElementById('questionArea');
const resultArea = document.getElementById('resultArea');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultScore = document.getElementById('resultScore');
const resultMessage = document.getElementById('resultMessage');

// =============================================
// 4. FUNCTIONS
// =============================================

// 4a. Load Question
function loadQuestion() {
    // Get current question from array
    const question = questions[currentQuestionIndex];
    
    // Update question number
    questionNumber.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    
    // Update question text
    questionText.textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // Create option buttons
    optionsContainer.innerHTML = '';
    
    // Loop through options array
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.dataset.index = index;
        button.onclick = function() {
            selectOption(index);
        };
        optionsContainer.appendChild(button);
    });
    
    // Reset state
    selectedOption = null;
    isAnswered = false;
    nextBtn.disabled = true;
    
    // Update score display
    updateScore();
}

// 4b. Select Option
function selectOption(index) {
    // If already answered, ignore clicks
    if (isAnswered) return;
    
    const question = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Mark as answered
    isAnswered = true;
    selectedOption = index;
    
    // Disable all options
    optionButtons.forEach(btn => {
        btn.classList.add('disabled');
    });
    
    // Check if correct
    if (index === question.correct) {
        // Correct answer
        optionButtons[index].classList.add('correct');
        score++; // Increase score
        updateScore();
    } else {
        // Wrong answer - show correct answer
        optionButtons[index].classList.add('wrong');
        // Show correct answer
        optionButtons[question.correct].classList.add('correct');
    }
    
    // Enable next button
    nextBtn.disabled = false;
}

// 4c. Next Question or Show Results
function goToNext() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        // Load next question
        loadQuestion();
    } else {
        // Quiz is complete - show results
        showResults();
    }
}

// 4d. Show Results
function showResults() {
    // Hide question area
    questionArea.style.display = 'none';
    
    // Show result area
    resultArea.style.display = 'block';
    
    // Calculate percentage
    const totalQuestions = questions.length;
    const percentage = (score / totalQuestions) * 100;
    
    // Set results based on score
    resultScore.textContent = `You got ${score} out of ${totalQuestions} correct!`;
    
    // Determine message and icon
    if (percentage === 100) {
        resultIcon.textContent = '🌟';
        resultTitle.textContent = 'Perfect Score!';
        resultMessage.textContent = 'Amazing! You got every question right!';
    } else if (percentage >= 80) {
        resultIcon.textContent = '🎉';
        resultTitle.textContent = 'Great Job!';
        resultMessage.textContent = 'You did really well! Keep learning!';
    } else if (percentage >= 60) {
        resultIcon.textContent = '👍';
        resultTitle.textContent = 'Good Effort!';
        resultMessage.textContent = 'Not bad! Review the topics you missed.';
    } else if (percentage >= 40) {
        resultIcon.textContent = '📚';
        resultTitle.textContent = 'Keep Practicing!';
        resultMessage.textContent = 'Review your answers and try again!';
    } else {
        resultIcon.textContent = '💪';
        resultTitle.textContent = 'Don\'t Give Up!';
        resultMessage.textContent = 'Practice makes perfect. Try again!';
    }
    
    // Update progress bar to 100%
    progressFill.style.width = '100%';
}

// 4e. Update Score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}/${questions.length}`;
}

// 4f. Restart Quiz
function restartQuiz() {
    // Reset all variables
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    isAnswered = false;
    
    // Hide result, show question
    resultArea.style.display = 'none';
    questionArea.style.display = 'block';
    
    // Update score
    updateScore();
    
    // Load first question
    loadQuestion();
}

// =============================================
// 5. EVENT LISTENERS
// =============================================

// Next button click
nextBtn.addEventListener('click', goToNext);

// =============================================
// 6. KEYBOARD SUPPORT (Bonus)
// =============================================

document.addEventListener('keydown', function(event) {
    // Number keys 1-4 to select options
    if (event.key >= '1' && event.key <= '4') {
        const index = parseInt(event.key) - 1;
        const optionButtons = document.querySelectorAll('.option-btn');
        if (optionButtons[index] && !optionButtons[index].classList.contains('disabled')) {
            selectOption(index);
        }
    }
    
    // Enter key for next
    if (event.key === 'Enter' && !nextBtn.disabled) {
        goToNext();
    }
});

// =============================================
// 7. START THE QUIZ
// =============================================

loadQuestion();
console.log('📝 Quiz App started!');
console.log('📚 Total questions:', questions.length);
console.log('⌨️ Press 1-4 to select answers, Enter for next');