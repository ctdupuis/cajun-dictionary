const form = document.getElementById('register');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passToggle = document.getElementById('show');
const error = document.getElementById('error-message');


handleSubmit = e => {
    e.preventDefault();
    let obj = {
        username: username.value,
        password: password.value
    }
    axios.post(`https://cajun-dictionary.herokuapp.com/login`, obj)
    .then(res => {
        if (res.data === "Login success") {
            window.location.replace("/");
        }
    })
    .catch(err => {
        error.style.display = ''
    })

    form.reset();
}

togglePassword = e => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

passToggle.addEventListener('click', togglePassword);
form.addEventListener('submit', handleSubmit);