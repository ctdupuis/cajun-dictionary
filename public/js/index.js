let termSection = document.getElementById("word_of_day");

init = () => {
    seedDB();
    handleDate();
    handleTermoOfDay('init');
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
                    ${term.definition}
                </blockquote>
                </p>
            </div>

            <div class="use-case">
                <p>
                    <strong>Use Case:</strong>

                    <blockquote>
                        ${term.use_case}
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

let dayInMs = 1000 * 60 * 60 * 24;
let termIndex = 0;

setInterval(handleTermoOfDay, dayInMs);

interval = () => {
    termIndex++;
    handleTermoOfDay('new');
}

seedDB = () => {
    axios.get('http://localhost:3000/seed')
    .then(res => console.log(res.data));
}

document.addEventListener('DOMContentLoaded', init);
