handleWordOfDay = () => {
    let date = new Date();
    document.getElementById('date').innerText = date.toDateString();
}

document.addEventListener('DOMContentLoaded', handleWordOfDay);
