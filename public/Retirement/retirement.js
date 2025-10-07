let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    // This removes the active class from any slide that is in our slides class list
    slides.forEach(slide => slide.classList.remove('slide-active'));

    // Ensuring index is not over the total amount of slides
    if (index >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else if (index < 0) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    // Show the current slide
    slides[currentSlide].classList.add('slide-active');
}

function changeSlide(direction) { //This will take the direction of either a key press or a click on the button and change to the next slide accordingly (Input should be a number)
    showSlide(currentSlide + direction);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {  //Letting the event listener know to listen out for a right arrow key press.
        changeSlide(1);
    } else if (e.key === 'ArrowLeft') { //Same goes for this case as well
        changeSlide(-1);
    }
});

// Initialize
showSlide(0);

// Drag and Drop Functionality
let cards = document.querySelectorAll('.activity-card');
let selected = null;

// Prevent image drag
document.querySelectorAll('.activity-icon').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});

// Card drag handlers
cards.forEach(card => {
    card.addEventListener('dragstart', (e) => { //The point to which the user's drag starts
        selected = e.target;
        e.target.style.opacity = '0.5';
    });

    card.addEventListener('dragend', (e) => { //This is the point to which the user's drag ends
        e.target.style.opacity = '1'; //Just for the drag and drop effect
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

// Setup all drop zones using classes
document.querySelectorAll('.drop-zone-pros, .drop-zone-cons').forEach(zone => {
    setupDropZone(zone);
});

// Enable submit button when all cards are placed
function updateSubmitButton() {
    const activeSlide = document.querySelector('.slide-active');
    if (!activeSlide) return;

    const submitBtn = activeSlide.querySelector('.slide-btn-submit');
    const cardStack = activeSlide.querySelector('.activity-cards');

    if (submitBtn && cardStack) {
        const cardsInStack = cardStack.querySelectorAll('.activity-card').length;
        submitBtn.disabled = cardsInStack > 0;
    }
}

// Check answers function - works for both slides using classes
function checkAnswers() {
    const activeSlide = document.querySelector('.slide-active');
    const prosCards = activeSlide.querySelectorAll('.drop-zone-pros .activity-card');
    const consCards = activeSlide.querySelectorAll('.drop-zone-cons .activity-card');
    const feedback = activeSlide.querySelector('.slide-feedback');

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
        feedback.textContent = 'Perfect! All items are in the correct category.';
        feedback.className = 'slide-feedback correct';
    } else {
        feedback.textContent = 'Some items are in the wrong category. Try again!';
        feedback.className = 'slide-feedback incorrect';
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
    const explanation = document.querySelector(`#q${currentQuestion} .quiz-explanation`);
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
        explanation.innerHTML = `<p class="correct-feedback">Correct! ${quizData[currentQuestion].explanation}</p>`;
        explanation.classList.add('correct-feedback');
    } else {
        explanation.innerHTML = `<p class="incorrect-feedback">Incorrect. ${quizData[currentQuestion].explanation}</p>`;
        explanation.classList.add('incorrect-feedback');
    }

    // Hide submit button, show next button
    const submitBtn = document.querySelector('.quiz-btn-submit');
    const nextBtn = document.querySelector('.quiz-btn-next');
    
    if (submitBtn) submitBtn.style.display = 'none';

    if (currentQuestion < 3) {
        if (nextBtn) nextBtn.style.display = 'block';
    } else {
        // Show final score
        const scoreDisplay = document.querySelector('.quiz-score');
        if (scoreDisplay) {
            scoreDisplay.innerHTML = `<p>Quiz Complete! You scored ${quizScore}/3</p>`;
        }
    }
}

function nextQuestion() {
    // Hide current question (nextq and currentq)
    const currentQ = document.getElementById(`q${currentQuestion}`);
    if (currentQ) currentQ.style.display = 'none';

    // The currentquestion variable should increment by one to go to the next question
    currentQuestion++;

    // Show next question
    const nextQ = document.getElementById(`q${currentQuestion}`);
    if (nextQ) nextQ.style.display = 'block';

    // Reset buttons
    const submitBtn = document.querySelector('.quiz-btn-submit');
    const nextBtn = document.querySelector('.quiz-btn-next');
    
    if (submitBtn) submitBtn.style.display = 'block';
    if (nextBtn) nextBtn.style.display = 'none';
}

// Contribution Slider Functionality
const contributionSlider = document.getElementById('contribution');
const contributionValue = document.getElementById('amount');

if (contributionSlider && contributionValue) {
    contributionSlider.addEventListener('input', function() {
        contributionValue.textContent = this.value;
    });
}
