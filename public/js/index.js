checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth', 
    { withCredentials: true });
    const data = response.data;
    // debugger
    if (data.user) {
        let html = `
        <span>Welcome, ${username}</span>
        <a href="/logout">Log Out</a>
        `
        document.querySelector('.session-nav').innerHTML = html;
    } 
    console.log(data)
}

document.getElementById('logout').addEventListener('click', () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
    .then(res => console.log(res.data))
})

handleWordOfDay = () => {
    let date = new Date();
    document.getElementById('date').innerText = date.toDateString();
}

document.addEventListener('DOMContentLoaded', handleWordOfDay);
document.addEventListener('DOMContentLoaded', checkSession);