let form = document.getElementById('add-term');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let useCase = document.getElementById('use-case');
let pronunciation = document.getElementById('pronunciation');

checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth', 
    { withCredentials: true });
    const data = response.data;
    if (!data.username) {
        window.location.replace("/");
    } else {
        let { id, username } = data;
        let html = `
        <span class="username">Welcome, ${username}</span>
        <button onclick="logout()" id="logout">Log Out</button>
        `
        document.querySelector('.session-nav').innerHTML = html;
    }
}

logout = () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
    .then(res => window.location.replace("/"))
}

handleSubmit = e => {
    e.preventDefault();
    
    let obj = {
        name: term.value,
        pronunciation: pronunciation.value,
        definition: definition.value,
        useCase: useCase.value,
        
    }
    // axios.post('http://localhost:3000/add', obj)
    // .then(res => console.log(res.data))
    console.log(obj)

    form.reset();
}

form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', checkSession);