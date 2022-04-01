checkSession = async () => {
    const response = await axios.get('https://cajun-dictionary.herokuapp.com/auth', 
    { withCredentials: true });
    const data = response.data;
    if (data.username) {
        window.location.replace("/")
    } 
}

document.addEventListener('DOMContentLoaded', checkSession);