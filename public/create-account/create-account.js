const firstName = document.getElementById('first-name')
const lastName = document.getElementById('last-name')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('user-password')
const confirmPassword = document.getElementById('confirm-password')
const errorMessage = document.getElementById('error')
const join = document.getElementById('join')
const red = '#ffbab5'

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
    firstName.style.backgroundColor = 'white'
    lastName.style.backgroundColor = 'white'
    username.style.backgroundColor = 'white'
    email.style.backgroundColor = 'white'
    password.style.backgroundColor = 'white'
    confirmPassword.style.backgroundColor = 'white'
    if (checkRequired() === false) {
        e.preventDefault()
        errorMessage.textContent = 'Fill out all required fields'
    } else if (checkFirstName() === false) {
        e.preventDefault()
        firstName.style.backgroundColor = red
        errorMessage.textContent = 'Enter a valid first name'
    } else if (checkLastName() === false) {
        e.preventDefault()
        lastName.style.backgroundColor = red
        errorMessage.textContent = 'Enter a valid last name'
    } else if (checkUsername() === false) {
        e.preventDefault()
        username.style.backgroundColor = red
        errorMessage.textContent = 'Username must contain at least one letter and be a minimum of 4 characters'
    } else if (checkEmail() === false) {
        e.preventDefault()
        email.style.backgroundColor = red
        errorMessage.textContent = 'Enter a valid email'
    } else if (checkPassword() === false) {
        e.preventDefault()
        password.style.backgroundColor = red
        errorMessage.textContent = 'Password must be at least 8 characters with at least one number and at least one special character'
    } else if (checkConfirm() === false) {
        e.preventDefault()
        confirmPassword.style.backgroundColor = red
        errorMessage.textContent = `"Password" and "Confirm Password" must match`
    } else {
        errorMessage.textContent = ''
    }
})


// Code to create account and push into table
const form = document.querySelector('form');
const joinBtn = document.getElementById('join');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    joinBtn.disabled = true;

    const payload = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        password: password.value,
    }
    if (!payload) { joinBtn.disabled = false; return; }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Signup failed.');

      form.reset();
      alert('Account created successfully!');
    } catch (err) {
        console.log("error: " + e);
    } finally {
      joinBtn.disabled = false;
    }
});

