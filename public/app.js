const username = document.getElementById('username')
const password = document.getElementById('user-password')
const signIn = document.getElementById('sign-in')


// Dashboard re-route
signIn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!username.value || !password.value) {
        return;
    }

    try {
        const res = await fetch('/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username.value, password: password.value }),
        });
        const data = await res.json();
        if (res.ok) {
            window.location.href = './dashboard/dashboard.html'; // Redirect to dashboard
        } else {
            alert(data.error || 'Sign-in failed');
        }
    } catch (err) {
        alert('Network error');
    }
});