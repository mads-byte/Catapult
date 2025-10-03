
const divs = document.querySelectorAll('.lesson-div')

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


function toggleLesson(div, arrow) {

    let height = getComputedStyle(div).maxHeight; //checks the height in the css instead of inline styles

    if (height === '45px') {
        arrow.innerHTML = "<i class='fa-solid fa-caret-up'></i>"
        div.style.maxHeight = '500px'
    } else {
        arrow.innerHTML = `<i class="fa-solid fa-sort-down"></i>`
        div.style.maxHeight = '45px'
    }
}

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







// contentHide.forEach(hide => {
//     hide.addEventListener('click', () => {
//         toggleLesson()
//     })

// })

// arrows.forEach(arrow => {
//     arrow.addEventListener('click', () => {
//         toggleLesson()
//     })

// })

// async function getUsers() {
//     try {
//         const userData = await fetch(`http://localhost:3000/students`)
//         const users = await userData.json
//         return users
//     } catch (error) {
//         console.log(error)
//     }
// }

// console.log(getUsers())


// const connection = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: 'password',
//     database: 'apprentice_db',
// });

// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySql')
// });

// connection
//     .promise()
//     .query('SELECT DISTINCT * FROM students')
//     .then(([rows]) => {
//         console.log(rows);
//     })

// app.get('/students', async (req, res) => {
//     try {
//         const students = await new sql.Request().query('SELECT * FROM students');
//         res.json(students[0]); // Or pool[0] for mysql2
//     } catch (err) {
//         console.error('Error fetching users:', err);
//         res.status(500).send('Error fetching users');
//     }
// });

// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on port 3000`);
// });
