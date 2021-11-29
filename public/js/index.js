let termSection = document.getElementById("word_of_day");
let recentSection = document.getElementById("most_recent");

init = () => {
    seedDB();
    handleDate();
    handleTermoOfDay('init');
    handleMostRecent();
}

handleDate = () => {
    let date = new Date();
    document.getElementById('date').innerText = date.toDateString();
}

handleTermoOfDay = method => {
    axios.get('http://localhost:3000/list/all')
    .then(res => {
        let term = res.data[termIndex];
        let html = `
        <div class="container bg-white">
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
        </div>
        `

        // Add the HTMl for the first term of the day
        if (method === 'init') {
            termSection.innerHTML += html;
        }

        // Change the HTML for a new term of the day
        if (method === 'new') {
            termSection.innerHTML = html;
        }
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

handleMostRecent = () => {
    axios.get('http://localhost:3000/recent')
    .then(res => {
        let term = res.data[0];
        let html = `
        <div class="title">
            <h3>Most Recent Addition</h3>
        </div>

        <div class="container bg-white">
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
        </div>
        `
        recentSection.innerHTML = html;
    })
}

let dayInMs = 1000 * 60 * 60 * 24;
let termIndex = 0;

setInterval(handleTermoOfDay, dayInMs);

interval = () => {
    termIndex++;
    handleTermoOfDay('new');
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
