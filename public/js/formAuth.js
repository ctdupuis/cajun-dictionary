checkSession = async () => {
    const response = await axios.get('http://localhost:3000/auth', 
    { withCredentials: true });
    const data = response.data;
    if (data.username) {
        window.location.replace("/")
    } 
}

document.addEventListener('DOMContentLoaded', checkSession);