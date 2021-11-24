document.addEventListener('DOMContentLoaded', () => {
    console.log("Here I am")
})

let path = document.location.pathname.split("");
let idx = path.length - 1;
let wordId = +path[idx];