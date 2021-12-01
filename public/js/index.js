let termSection = document.getElementById("word_of_day");
let likedSection = document.getElementById("most-likes");
let container = document.getElementById('word-container');
const addTab = document.getElementById('add-tab');


let loggedIn = false;

init = () => {
    seedDB();
    handleTermoOfDay();
    handleMostLiked();
}

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
        addTab.style.display = "";
        document.querySelector('.session-nav').innerHTML = html;
        loggedIn = true;
    } 
}

logout = () => {
    axios.get('http://localhost:3000/logout', { withCredentials: true })
    .then(res => window.location.replace("/"))
}

handleLikeBtn = method => {
    const likeBtn = document.getElementById(`${method}`);
    const termId = likeBtn.dataset.termId;
    // debugger
    if (!loggedIn) {
        likeBtn.classList.add("disabled");
        let html = `
        <div style="text-align: center;">
            <span><a class="list" href="http://localhost:3000/login">Log In</a> to like a term</span>
        </div>
        `

        let termDayContainer = document.getElementById('term-day-container');
        let likedContainer = document.getElementById('liked-term-container');

        if (likeBtn.id === 'like1') {
            termDayContainer.innerHTML += html;
        } else {
            likedContainer.innerHTML += html;
        }
    } else {
        likeBtn.addEventListener('click', addLike);
    }
    updateBtn(likeBtn.id, termId);
}

updateBtn = (method, termId) => {
    const likeBtn = document.getElementById(`${method}`)
    axios.get(`http://localhost:3000/likes/${termId}`)
    .then(res => {
        if (res.data.length === 0) {
            likeBtn.innerText = "Like";
            likeBtn.removeEventListener('click', unlike);
            likeBtn.addEventListener('click', addLike);
        } else {
            likeBtn.innerText = "Unlike";
            likeBtn.removeEventListener('click', addLike);
            likeBtn.addEventListener('click', unlike);
        }
    })

}

addLike = event => {
    // the term id
    let id = event.target.dataset.termId;

    // button to target
    let method = event.target.id;

    // number div to target
    let count = event.target.previousElementSibling.id;

    axios.put(`http://localhost:3000/term/${id}`)
    .then(res => {
        updateBtn(method, id);
        updateCount(count, id);
    })
}

unlike = event => {
    // the term id
    let id = event.target.dataset.termId;

    // button to target
    let method = event.target.id;

    // number div to target
    let count = event.target.previousElementSibling.id;

    axios.delete(`http://localhost:3000/likes/${id}`)
    .then(res => {
        updateBtn(method, id);
        updateCount(count, id);
    })
}

updateCount = (method, termId) => {
    axios.get(`http://localhost:3000/term/${termId}`)
    .then(res => {
        let likecount = document.getElementById(`${method}`);
        likecount.innerText = res.data.likes;
    })
}

let dayInMs = 1000 * 60 * 60 * 24;
let termDayId = 1;


interval = () => {
    termDayId++;
    handleTermoOfDay();
}

setInterval(interval, dayInMs);

handleDate = () => {
    let date = new Date();
    document.getElementById('date').innerText = date.toDateString();
}

handleTermoOfDay = () => {
    axios.get(`http://localhost:3000/term/${termDayId}`)
    .then(res => {
        let term = res.data;
        let html = `
        <div class="title flex space-bet">
            <h3>Term of the Day</h3>
            <span id="date"></span>
        </div>
        <div id="term-day-container" class="container bg-white">

            <h3>${term.name}</h3>
            <span class="pronunciation">${term.pronunciation}</span>

            <div class="definition">
                <p>
                <strong>Definition:</strong>

                <blockquote>
                    ${format(term.definition)}
                </blockquote>
                </p>
            </div>

            <div class="use-case">
                <p>
                    <strong>Use Case:</strong>

                    <blockquote>
                        ${format(term.use_case)}
                    </blockquote>
                </p>
            </div>
            <div id="likes-container" class="flex center-just">
                <div id="num1" class="num">${term.likes}</div><div data-term-id="${term.term_id}" id="like1" class="like">Like</div>
            </div>
        </div>
        `

        termSection.innerHTML = html;
        handleLikeBtn('like1');
        handleDate();
    })
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

handleMostLiked = () => {
    axios.get('http://localhost:3000/mostliked')
    .then(res => {
        let term = res.data[0];
        let html = `
        <div class="title">
            <h3>Most Liked Term</h3>
        </div>

        <div id="liked-term-container" class="container bg-white">
            <h3>${term.name}</h3>
            <span class="pronunciation">${term.pronunciation}</span>

            <div class="definition">
                <p>
                <strong>Definition:</strong>

                <blockquote>
                    ${format(term.definition)}
                </blockquote>
                </p>
            </div>

            <div class="use-case">
                <p>
                    <strong>Use Case:</strong>

                    <blockquote>
                        ${format(term.use_case)}
                    </blockquote>
                </p>
            </div>

            <div id="likes-container" class="flex center-just">
                <div id="num2" class="num">${term.likes}</div><div data-term-id="${term.term_id}" id="like2" class="like">Like</div>
            </div>
        </div>
        `
        likedSection.innerHTML = html;
        handleLikeBtn('like2')
    })
}


seedDB = async () => {
    const response = await axios.get('http://localhost:3000/list/all')
    const data = response.data
    if (data.length === 0) {
        axios.get('http://localhost:3000/seed')
        .then(res => console.log(res.data));
    }
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', checkSession);