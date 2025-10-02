const arrow = document.getElementById('arrow')
const lessonDiv = document.getElementById('lesson-div')
const contentHide = document.getElementById('content-hide')

function toggleLesson() {
    if (lessonDiv.style.maxHeight === '40px') {
        arrow.innerHTML = "<i class='fa-solid fa-caret-up'></i>"
        lessonDiv.style.maxHeight = '500px'
    } else {
        arrow.innerHTML = `<i class="fa-solid fa-sort-down"></i>`
        lessonDiv.style.maxHeight = '40px'
    }
}

arrow.addEventListener('click', () => {
    toggleLesson()
})

contentHide.addEventListener('click', () => {
    toggleLesson()
})