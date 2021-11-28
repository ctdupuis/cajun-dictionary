const container = document.getElementById('word-container');


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

getList = async () => {
    const response = await axios.get('http://localhost:3000/list/all')
    const data = response.data;
    renderList(data);
}

renderList = data => {
    let letter = data[0].name.slice(0, 1).toUpperCase();
    console.log(letter)
    data.forEach(term => {
        if (!term.name.slice(0, 1).toUpperCase() === letter) {
            letter = term.name.slice(0, 1)
        }
        const title = `
        <div class="word-wrapper">
            <div data-id="${letter}" class="list-title flex space-bet">
                <h3>${letter}</h3><h3>Submitted by</h3>
            </div>
        </div>
        `
        container.innerHTML += title;
    })
}

document.addEventListener('DOMContentLoaded', checkSession);
document.addEventListener('DOMContentLoaded', getList);