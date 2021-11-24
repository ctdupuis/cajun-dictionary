const form = document.getElementById('register');
const username = document.getElementById('username');
const password = document.getElementById('password');
const passToggle = document.getElementById('show');


handleSubmit = e => {
    e.preventDefault();
    let obj = {
        username: username.value,
        password: password.value
    }
    axios.post(`http://localhost:3000/login`, obj)
    .then(res => {
        if (res.data === "Login success") {
            window.location.replace("/");
        }
    })
    .catch(err => console.log(err))
}

togglePassword = e => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

passToggle.addEventListener('click', togglePassword);
form.addEventListener('submit', handleSubmit);