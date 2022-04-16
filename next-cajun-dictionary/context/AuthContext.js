import {createContext, useState, useEffect} from 'react';
import {useRouter} from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const register = async(user) => {
        console.log('Register submitted')
    }

    const login = async(user) => {
        setUser(user)
        console.log('Login submitted')
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