document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("sign-up");
    const emailInput = document.getElementById("email");
    const errmsg = document.getElementById("email-error");

    form.addEventListener("submit", function (event) {
        const email = emailInput.value.trim();
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errmsg.textContent = "" ;

        if (!pattern.test(email)) {
            event.preventDefault();
            errmsg.textContent = "Please enter a valid email address"
            emailInput.focus

        }
    });
});
