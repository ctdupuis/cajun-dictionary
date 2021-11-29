const devUrl = 'http://localhost:3000'

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
    
    axios.post(`${devUrl}/register`, obj)
    .then(res => {
        if (res.status === 200) {
            window.location.replace("/")
        }
    })
    .catch(err => error.style.display = '');
}

togglePassword = e => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
}

passToggle.addEventListener('click', togglePassword);
form.addEventListener('submit', handleSubmit);