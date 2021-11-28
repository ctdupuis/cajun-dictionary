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
    let titleFound;
    data.forEach(term => {
        if (term.name.slice(0, 1).toUpperCase() !== letter) {
            letter = term.name.slice(0, 1)
        }
        titleFound = document.querySelector(`div[data-id='${letter}']`)
        if (!titleFound) {
            let title = `
            <div class="word-wrapper">
                <div data-id="${letter}" class="list-title flex space-bet">
                    <h3>${letter}</h3><h3>Submitted by</h3>
                </div>
            </div>
            `
            container.innerHTML += title;
        }
    })
    data.forEach(term => {
        let letter = term.name.slice(0,1).toUpperCase();
        let target = document.querySelector(`div[data-id='${letter}']`)
        if (letter === target.dataset.id) {
            let termHtml = `
            <div class="flex space-bet">
                <a class="list" href="http://localhost:3000/list/${term.term_id}">${term.name}</a><a class="list">${term.username}</a>
            </div>
            `
            target.parentElement.innerHTML += termHtml
        }
    })
}

document.addEventListener('DOMContentLoaded', checkSession);
document.addEventListener('DOMContentLoaded', getList);