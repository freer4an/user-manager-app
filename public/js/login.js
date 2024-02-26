const login_btn = document.getElementById("btn-login");
const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

login_btn.addEventListener("click", async (event) => {
    event.preventDefault();
    const email = form.email.value;
    const password = form.password.value;
    if (!email || !password) {
        alert("All fields are required");
        return;
    }

    const body = {
        email: email,
        password: password
    }

    sendRequest("/login", "POST", body)
        .then(response =>response.json())
        .then(data => {
            if (data.user) {
                window.location.href = "/users/"+data.user;
            } else {
                emailError.textContent = data.error.email;
                passwordError.textContent = data.error.password;
            }
        })
        .catch(err => console.log(err.message))
})