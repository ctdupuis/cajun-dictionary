let path = document.location.pathname.split("/");
let idx = path.length - 1;
let wordId = +path[idx];
let container = document.getElementById('word-container');

updateTitle = termName => {
    document.title = `${termName} | Cajun Dictionary`
}

fetchTerm = () => {
    axios.get(`http://localhost:3000/term/${wordId}`)
    .then(res => renderTerm(res.data))
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

    <div class="flex likes-container center-just">
        <div class="num">${term.likes}</div><div onclick="addLike(${term.term_id})" class="like">Like</div>
    </div>
    `
    container.innerHTML += html;
}

addLike = id => {
    // fetch the server to add a new like
    axios.put(`http://localhost:3000/term/${id}`)
    .then(res => console.log(res.data))
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

document.addEventListener('DOMContentLoaded', fetchTerm);