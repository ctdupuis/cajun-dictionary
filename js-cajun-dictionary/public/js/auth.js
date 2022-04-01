const addTab = document.getElementById('add-tab');

checkSession = async () => {
    const response = await axios.get('https://cajun-dictionary.herokuapp.com/auth', 
    { withCredentials: true });
    const data = response.data;
    if (data.username) {
        let { id, username } = data;
        let html = `
        <span class="username">Welcome, ${username}</span>
        <button onclick="logout()" id="logout">Log Out</button>
        `
        addTab.style.display = "";
        document.querySelector('.session-nav').innerHTML = html;
    } 
}

logout = () => {
    axios.get('https://cajun-dictionary.herokuapp.com/logout', { withCredentials: true })
    .then(res => window.location.replace("/"))
}


document.addEventListener('DOMContentLoaded', checkSession);