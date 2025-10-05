let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // Remove active class from all slides
    slides.forEach(slide => slide.classList.remove('active'));

    // Ensure index is within bounds
    if (index >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else if (index < 0) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Show the current slide
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
});

// Initialize
showSlide(0);

// Drag and Drop Functionality for Slide 2
let cards = document.querySelectorAll('.card');
let prosZone = document.getElementById('pros-zone');
let consZone = document.getElementById('cons-zone');
let selected = null;

// Prevent image drag
document.querySelectorAll('.card img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Card drag handlers
cards.forEach(card => {
    card.addEventListener('dragstart', (e) => {
        selected = e.target;
        e.target.style.opacity = '0.5';
    });

    card.addEventListener('dragend', (e) => {
        e.target.style.opacity = '1';
        updateSubmitButton();
    });
});

// Drop zone handlers
function setupDropZone(zone) {
    zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        if (selected) {
            zone.appendChild(selected);
            selected = null;
        }
    });
}

if (prosZone && consZone) {
    setupDropZone(prosZone);
    setupDropZone(consZone);
}

// Enable submit button when all cards are placed
function updateSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    const cardStack = document.querySelector('.card-stack');

    if (submitBtn && cardStack) {
        const cardsInStack = cardStack.querySelectorAll('.card').length;
        submitBtn.disabled = cardsInStack > 0;
    }
}

// Check answers function
function checkAnswers() {
    const prosCards = document.querySelectorAll('#pros-zone .card');
    const consCards = document.querySelectorAll('#cons-zone .card');
    const feedback = document.getElementById('slide2-feedback');

    let allCorrect = true;

    // Check pros zone
    prosCards.forEach(card => {
        if (card.dataset.answer !== 'pro') {
            allCorrect = false;
            card.style.border = '3px solid #cc8f8f';
        } else {
            card.style.border = '3px solid #8fcc8f';
        }
    });

    // Check cons zone
    consCards.forEach(card => {
        if (card.dataset.answer !== 'con') {
            allCorrect = false;
            card.style.border = '3px solid #cc8f8f';
        } else {
            card.style.border = '3px solid #8fcc8f';
        }
    });

    // Show feedback
    if (allCorrect) {
        feedback.textContent = '✓ Perfect! All items are in the correct category.';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = '✗ Some items are in the wrong category. Try again!';
        feedback.className = 'feedback incorrect';
    }
}

// Quiz Functionality
const quizData = {
    1: { correct: 'A', explanation: 'A 401(k) is a workplace retirement plan offered by your employer, while a Roth IRA is an individual account you can open on your own at any brokerage.' },
    2: { correct: 'B', explanation: 'Many employers offer a 401(k) match, where they contribute money to your account based on how much you contribute. This is essentially free money! Roth IRAs don\'t have employer matches because they\'re individual accounts not tied to your workplace.' },
    3: { correct: 'B', explanation: 'With a Roth IRA, you contribute money that\'s already been taxed (after-tax dollars). The benefit is that when you retire and withdraw the money, you pay ZERO taxes on it—including all the growth!' }
};

let currentQuestion = 1;
let quizScore = 0;

function submitQuizAnswer() {
    const selectedOption = document.querySelector(`input[name="q${currentQuestion}"]:checked`);

    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const answer = selectedOption.value;
    const correctAnswer = quizData[currentQuestion].correct;
    const explanation = document.getElementById(`explanation-${currentQuestion}`);
    const options = document.querySelectorAll(`input[name="q${currentQuestion}"]`);

    // Disable all options
    options.forEach(option => {
        option.disabled = true;
        const label = option.parentElement;

        if (option.value === correctAnswer) {
            label.classList.add('correct');
        } else if (option.checked && option.value !== correctAnswer) {
            label.classList.add('incorrect');
        }
    });

    // Show explanation
    if (answer === correctAnswer) {
        quizScore++;
        explanation.innerHTML = `<p class="correct-feedback">✓ Correct! ${quizData[currentQuestion].explanation}</p>`;
    } else {
        explanation.innerHTML = `<p class="incorrect-feedback">✗ Incorrect. ${quizData[currentQuestion].explanation}</p>`;
    }

    // Hide submit button, show next button
    document.getElementById('submit-quiz').style.display = 'none';

    if (currentQuestion < 3) {
        document.getElementById('next-question').style.display = 'block';
    } else {
        // Show final score
        document.getElementById('quiz-score').innerHTML = `<p class="final-score">Quiz Complete! You scored ${quizScore}/3</p>`;
    }
}

function nextQuestion() {
    // Hide current question
    document.getElementById(`question-${currentQuestion}`).style.display = 'none';

    // Move to next question
    currentQuestion++;

    // Show next question
    document.getElementById(`question-${currentQuestion}`).style.display = 'block';

    // Reset buttons
    document.getElementById('submit-quiz').style.display = 'block';
    document.getElementById('next-question').style.display = 'none';
}

// Contribution Slider Functionality
const contributionSlider = document.getElementById('contribution-slider');
const contributionValue = document.getElementById('contribution-value');

if (contributionSlider && contributionValue) {
    contributionSlider.addEventListener('input', function() {
        contributionValue.textContent = this.value;
    });
}
