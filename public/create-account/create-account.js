const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('user-password')
const confirmPassword = document.getElementById('confirm-password')
const join = document.getElementById('join')


const nameRegex = /^[a-zA-Z]{2,16}$/ //regex to match a minimum of 2 letters and a maximum of 16 (only letters)


const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9._-]{4,16}$/ //specifications in the following lines...
/*User name regex matches:
    - at least one letter
    - at least 4 characters
    - a maximum of 16 characters
    - allows for hyphens, underscores, dots, and numbers
*/

const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ //specifications below
/* Email regex matches:
    - two or more consecutive dots are not allowed = (?!.*\.\.)
    - must start with a letter or number = [a-zA-Z0-9]
    - zero or more characters before the domain and after the first character = [a-zA-Z0-9._%+-]*
    - exactly one @ = @
    - one or more characters after the @ for the domain  = [a-zA-Z0-9.-]+
    - dot required after the domain = \.
    - at least 2 letters after the dot = [a-zA-Z]{2,}
*/

const passwordRegex = /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/ //at least 8 characters total, at least one special character, and at least one number



function checkRequired() {
    let formInfo = [firstName.value, lastName.value, username.value, email.value, password.value, confirmPassword.value]
    if (formInfo.includes('')) {
        return false
    }
    else {
        return true
    }
}

function checkFirstName() {
    return nameRegex.test(firstName.value)
}
function checkLastName() {
    return nameRegex.test(lastName.value)
}
function checkUsername() {
    return usernameRegex.test(username.value)
}
function checkEmail() {
    return emailRegex.test(email.value)
}
function checkPassword() {
    return passwordRegex.test(password.value)
}
function checkConfirm() {
    return confirmPassword.value === password.value
}


join.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(`all fields filled: ${checkRequired()}`)
    console.log(`first name: ${checkFirstName()}`)
    console.log(`last name: ${checkLastName()}`)
    console.log(`username: ${checkUsername()}`)
    console.log(`email: ${checkEmail()}`)
    console.log(`password: ${checkPassword()}`)
    console.log(`confirm password: ${checkConfirm()}`)
})