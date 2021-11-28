checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth', 
    { withCredentials: true });
    const data = response.data;
    if (data.username) {
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


document.addEventListener('DOMContentLoaded', checkSession);