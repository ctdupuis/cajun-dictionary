import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';
import {API_STRING} from '../helpers/constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async(user) => {
        console.log('Register submitted')
    }

    const login = async(user) => {
        const res = await axios.post(`${API_STRING}/auth/login`, user);
        console.log(res.data)
        if (res.error) {
            setError(res.error)
        } else {
            setUser(res.data)
        }
    }

    const logout = async() => {
        setUser(null)
    }   

    const checkAuth = async() => {
        console.log('auth check')
    }

    return(
        <AuthContext.Provider value={{user, error, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;