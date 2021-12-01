const container = document.getElementById('word-container');
const search = document.getElementById('search');
const addTab = document.getElementById('add-tab');

const navItems = document.getElementsByClassName('nav-item');

navItems[1].classList.add("active");

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
        addTab.style.display = '';
        document.querySelector('.session-nav').innerHTML = html;
    } 
}

getList = async () => {
    const response = await axios.get('https://cajun-dictionary.herokuapp.com/list/all')
    const data = response.data;
    renderList(data);
}

format = string => {
    // formats strings to avoid throwing errors for words using contractions
    // will be called on pushing up and receiving back data
    let key = {
        "/": "'",
        "'": "/"
    }
    let splitStr = string.split("");
    let newStr = []
    for ( let i = 0; i < splitStr.length; i++) {
        if (key[splitStr[i]]) {
            newStr.push(key[splitStr[i]])
        } else {
            newStr.push(splitStr[i])
        }
    }
    return newStr.join("");
}

renderList = data => {
    let letter = data[0].name.slice(0, 1).toUpperCase();
    let titleFound;
    data.forEach(term => {
        if (term.name.slice(0, 1).toUpperCase() !== letter) {
            letter = term.name.slice(0, 1).toUpperCase();
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
            <div data-term="${format(term.name)}" class="flex space-bet">
                <a class="list" href="https://cajun-dictionary.herokuapp.com/list/${term.term_id}">${format(term.name)}</a><span>${term.username}</span>
            </div>
            `
            target.parentElement.innerHTML += termHtml;
        }
    })
}

clearChildren = nodeList => {
    while (nodeList.length > 0) {
        nodeList[0].remove();
    }
}

handleSearch =  async event => {
    let resultsDiv = document.getElementById('results') || document.createElement('div');
    resultsDiv.id = 'results';
    container.prepend(resultsDiv);
    let searchTerm = event.target.value;

    // prevent event from searching based on an empty string
    if (searchTerm !== '') {
        // grab terms from the page
        let terms = Array.from(document.getElementsByClassName('list')).filter(el => el.textContent.match(searchTerm));

        // checks if terms are rendered and removes them if they are
        if (resultsDiv.childElementCount > 0) {
            await clearChildren(resultsDiv.children);
        }
        
        terms.forEach(term => {
            let a = document.createElement('a');
            a.textContent = term.textContent;
            a.classList = "search-list";
            a.href = term.href;
            resultsDiv.appendChild(a);
        })
    }
}

document.addEventListener('DOMContentLoaded', checkSession);
document.addEventListener('DOMContentLoaded', getList);