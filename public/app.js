const username = document.getElementById('username')
const password = document.getElementById('user-password')
const signIn = document.getElementById('sign-in')


signIn.addEventListener('click', (e) => {
    if (!username.value || !password.value) {
        e.preventDefault()
    }
})