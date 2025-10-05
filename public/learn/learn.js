const arrow2 = document.getElementById('arrow2')
const lessonDiv2 = document.getElementById('lesson-div2')
const contentHide2 = document.getElementById('content-hide2')
const submit = document.getElementById('submit')
const taxQuiz = document.getElementById('tax-quiz')


let lessonsCompleted = ['incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete', 'incomplete'];

function toggleLesson(div, arrow) {

    let height = getComputedStyle(div).maxHeight; //checks the height in the css instead of inline styles

    if (height === '45px') {
        arrow.innerHTML = "<i class='fa-solid fa-caret-up'></i>"
        div.style.maxHeight = div.scrollHeight + 'px'
    } else {
        arrow.innerHTML = `<i class="fa-solid fa-sort-down"></i>`
        div.style.maxHeight = '45px'
    }
}


function taxQuizScore(obj) {
    const answers = Object.values(obj);
    let correct = answers.reduce((sum, answer) => { if (answer === 'correct') { return sum + 1 } return sum }, 0)
    console.log(correct)
    let score = `${correct}/6`
    return score
}

arrow2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

contentHide2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let quizData = { //sets unanswered questions to incorrect by default
        question1: 'incorrect',
        question2: 'incorrect',
        question3: 'incorrect',
        question4: 'incorrect',
        question5: 'incorrect',
        question6: 'incorrect'
    }
    const formData = new FormData(taxQuiz);
    const formObject = Object.fromEntries(formData.entries());
    finalQuizData = {
        ...quizData,
        ...formObject
    }
    let finalScore = taxQuizScore(finalQuizData)
    console.log(finalQuizData)
    console.log(taxQuizScore(finalQuizData))
    if (finalScore === '6/6' || '5/6') {
        lessonsCompleted[1] = 'complete'
    }
    console.log(lessonsCompleted)
})