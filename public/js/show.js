let path = document.location.pathname.split("/");
let idx = path.length - 1;
let wordId = +path[idx];
let container = document.getElementById('word-container');
const addTab = document.getElementById('add-tab');


let loggedIn = false;

checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth', 
    { withCredentials: true });
    const data = response.data;
    fetchTerm();
    if (data.username) {
        let { id, username } = data;
        let html = `
        <span class="username">Welcome, ${username}</span>
        <button onclick="logout()" id="logout">Log Out</button>
        `
        addTab.style.display = "";
        document.querySelector('.session-nav').innerHTML = html;
        loggedIn = true;
    } 
}

logout = () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
    .then(res => window.location.replace("/"))
}

handleLikeBtn = () => {
    const likeBtn = document.getElementById('like');
    if (!loggedIn) {
        likeBtn.classList.add("disabled");
        let html = `
        <div style="text-align: center;">
            <span><a class="list" href="http://localhost:3000/login">Log In</a> to like a term</span>
        </div>
        `
        container.innerHTML += html;
    } else {
        likeBtn.addEventListener('click', addLike);
    }
}

addLike = event => {
    let id = event.target.dataset.termId;
    // fetch the server to add a new like
    axios.put(`http://localhost:3000/term/${id}`)
    .then(res => console.log(res.data))
}

updateTitle = term => {
    document.title = `${term.name} | Cajun Dictionary`
}

fetchTerm = () => {
    axios.get(`http://localhost:3000/term/${wordId}`)
    .then(res => {
        renderTerm(res.data);
        updateTitle(res.data);
    })
}

renderTerm = term => {
    
    let html = `
    <div data-user-id="${term.user_id}" class="title flex space-bet show">
        <div class="flex col">
            <h3>${term.name}</h3>
            <span class="pronunciation">${term.pronunciation}</span>
        </div>
        <span>Submitted by ${term.username}</span>
    </div>
    
    <div class="definition show">
        <p>
            <strong>Definition:</strong>
            
            <blockquote>
                ${term.definition}
            </blockquote>
        </p>
    </div>
    
    <div class="use-case show">
        <p>
            <strong>Use Case:</strong>
            
            <blockquote>
                ${term.use_case}
            </blockquote>
        </p>
    </div>
    
    <div id="likes-container" class="flex center-just">
        <div class="num">${term.likes}</div><div data-term-id="${term.term_id}" id="like" class="like">Like</div>
    </div>
    `
    container.innerHTML += html;

    handleLikeBtn();
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


document.addEventListener('DOMContentLoaded', checkSession);