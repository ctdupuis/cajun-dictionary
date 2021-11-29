let path = document.location.pathname.split("/");
let idx = path.length - 1;
let wordId = +path[idx];

updateTitle = termName => {
    document.title = `${termName} | Cajun Dictionary`
}

fetchTerm = () => {
    axios.get(`http://localhost:3000/${wordId}`)
    .then(res => renderTerm(res.data))
}

renderTerm = term => {
    debugger
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