let form = document.getElementById('add-word');
let word = document.getElementById('word');
let definition = document.getElementById('definition');
let useCase = document.getElementById('use-case');


handleSubmit = e => {
    e.preventDefault();
    
    let obj = {
        word: word.value,
        definition: definition.value,
        useCase: useCase.value
    }
    console.log(obj)
}

form.addEventListener('submit', handleSubmit);