setup = () => {
    seedDB();
    handleWordOfDay();
}

handleWordOfDay = () => {
    let date = new Date();
    document.getElementById('date').innerText = date.toDateString();
}

seedDB = () => {
    axios.get('http://localhost:3000/seed')
    .then(res => console.log(res.data));
}

document.addEventListener('DOMContentLoaded', setup);
