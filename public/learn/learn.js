const submit = document.getElementById('submit')
const taxQuiz = document.getElementById('tax-quiz')
const testResult = document.getElementById('result')

const lessonDiv1 = document.getElementById('lesson-div1')
const arrow1 = document.getElementById('arrow1')
const contentHide1 = document.getElementById('content-hide1')

const lessonDiv2 = document.getElementById('lesson-div2')
const arrow2 = document.getElementById('arrow2')
const contentHide2 = document.getElementById('content-hide2')


const lessonDiv3 = document.getElementById('lesson-div3')
const arrow3 = document.getElementById('arrow3')
const contentHide3 = document.getElementById('content-hide3')

const lessonDiv4 = document.getElementById('lesson-div4')
const arrow4 = document.getElementById('arrow4')
const contentHide4 = document.getElementById('content-hide4')

const lessonDiv5 = document.getElementById('lesson-div5')
const arrow5 = document.getElementById('arrow5')
const contentHide5 = document.getElementById('content-hide5')

const lessonDiv6 = document.getElementById('lesson-div6')
const arrow6 = document.getElementById('arrow6')
const contentHide6 = document.getElementById('content-hide6')


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


contentHide1.addEventListener('click', () => {
    toggleLesson(lessonDiv1, arrow1)
})

contentHide2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

contentHide3.addEventListener('click', () => {
    toggleLesson(lessonDiv3, arrow3)
})

contentHide4.addEventListener('click', () => {
    toggleLesson(lessonDiv4, arrow4)
})

contentHide5.addEventListener('click', () => {
    toggleLesson(lessonDiv5, arrow5)
})

contentHide6.addEventListener('click', () => {
    toggleLesson(lessonDiv6, arrow6)
})




arrow1.addEventListener('click', () => {
    toggleLesson(lessonDiv1, arrow1)
})

arrow2.addEventListener('click', () => {
    toggleLesson(lessonDiv2, arrow2)
})

arrow3.addEventListener('click', () => {
    toggleLesson(lessonDiv3, arrow3)
})

arrow4.addEventListener('click', () => {
    toggleLesson(lessonDiv4, arrow4)
})

arrow5.addEventListener('click', () => {
    toggleLesson(lessonDiv5, arrow5)
})

arrow6.addEventListener('click', () => {
    toggleLesson(lessonDiv6, arrow6)
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
    if (finalScore === '6/6' || finalScore === '5/6') {
        lessonsCompleted[1] = 'complete'
        testResult.innerHTML = `Lesson Complete: You Scored ${finalScore}`
    } else if (finalScore !== '6/6' || '5/6') {
        testResult.innerHTML = `Try again: You Scored ${finalScore}`
    }
    console.log(lessonsCompleted)
})