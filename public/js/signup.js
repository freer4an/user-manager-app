const signup_btn = document.getElementById("btn-signup");
const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');

signup_btn.addEventListener("click", (event) => {
    event.preventDefault();
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!name || !email || !password) {
        alert("All fields are required");
        return;
    }
    const body = {
        name: name,
        email: email,
        password: password
    }
    sendRequest("/signup", "POST", body)
        .then(response =>response.json())
        .then(data => {
            if (data.user) {
                window.location.href = "/login";
            } else {
                if (data.error.includes("email")) {
                    emailError.textContent = data.error;
                    return;
                }
                document.getElementById('errorMessage').textContent = data.error;
            }
        })
        .catch(err => {
            document.getElementById('errorMessage').textContent = err.message;
        })
})