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


const quizData = {
    1: { 
        correct: 'B', 
        explanation: 'When you buy a stock, you\'re buying a small piece of ownership in the company. If the company does well, your stock becomes more valuable. You\'re not lending money (that\'s bonds), and there are no guarantees in stock investing!' 
    },
    2: { 
        correct: 'B', 
        explanation: 'ETFs (Exchange-Traded Funds) hold many different companies in one investment, giving you instant diversification. This reduces risk because if one company struggles, you still have many others. It\'s like buying a fruit smoothie instead of just one apple!' 
    },
    3: { 
        correct: 'A', 
        explanation: 'Bonds are loans you make to a company or government—they promise to pay you back with interest. Stocks are ownership in a company. Bonds are generally lower risk and lower return than stocks, making them better for short-term goals or stability.' 
    }
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
    // Hide current question
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
