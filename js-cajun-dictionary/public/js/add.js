let form = document.getElementById('add-term');
let term = document.getElementById('term');
let definition = document.getElementById('definition');
let useCase = document.getElementById('use-case');
let pronunciation = document.getElementById('pronunciation');
const addTab = document.getElementById('add-tab');

addTab.classList.add("active");

checkSession = async () => {
    const response = await axios.get('https://cajun-dictionary.herokuapp.com/auth', 
    { withCredentials: true });
    const data = response.data;
    if (!data.username) {
        window.location.replace("/");
    } else {
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

handleSubmit = e => {
    e.preventDefault();
    
    let obj = {
        name: format(term.value),
        pronunciation: format(pronunciation.value),
        definition: format(definition.value),
        useCase: format(useCase.value),
        
    }

    axios.post('https://cajun-dictionary.herokuapp.com/add', obj)
    .then(res => {
        let id = res.data[0].term_id;
        window.location.replace(`/list/${id}`);
    })


    form.reset();
}

form.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', checkSession);