checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth');
    const data = response.data;
    if (data.user) {
        //manipulate the DOM
    } 
    console.log(data)
}

document.getElementById('logout').addEventListener('click', () => {
    axios.delete('http://localhost:3000/logout', { withCredentials: true })
    .then(res => console.log(res.data))
})

document.addEventListener('DOMContentLoaded', checkSession);