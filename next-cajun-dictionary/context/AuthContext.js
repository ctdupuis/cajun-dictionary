import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {API_STRING} from '../helpers/constants';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function checkAuth() {
            if (localStorage.getItem('token')) {
                let token = await localStorage.getItem('token');
                let res = await axios.get(`${API_STRING}/auth`, 
                { headers: { Authorization: 'Bearer ' + token } });
                setUser(res.data.user);
            } else {
                console.log("Couldn't find token")
            }
        }
        checkAuth()
    }, [])


    const register = async(user) => {
        console.log('Register submitted')
    }

    const login = async(user) => {
        const res = await axios.post(`${API_STRING}/auth/login`, user);
        if (res.data.token) {
            localStorage.setItem('token', res.data.token);
            setUser(res.data.user);
        } else {
            setError(res.error)
        }
    }

    const logout = async() => {
        localStorage.removeItem('token');
        setUser(null);
    }   

    return(
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;