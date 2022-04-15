import { useState } from "react";
import Button from "../../components/ui/Button/Button";
import PasswordEye from "../../components/ui/Icons/PasswordEye";
import styles from '../../styles/auth-form.module.css'

export default function AuthForm(props) {
    const [formType, setFormType] = useState('login');
    const [showPassword, setShowPassword] = useState('password');

    const login = () => console.log('login')
    const register = () => console.log('register')

    const [formData, setFormData] = useState({
        data: {
            username: "",
            password: ""
        },
        login: {
            submitter: login,
            active: true
        },
        register: {
            submitter: register,
            active: false
        }
    })
 

    const togglePasswordShow = () => {
       if (showPassword === 'password') {
            setShowPassword('text')
       } else if (showPassword === 'text') {
            setShowPassword('password')
       }
    }

    const handleChange = e => {
        setFormData({
            ...formData,
            data : {
                ...formData.data,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleActiveType = type => {
        setFormType(type);
    }

    const handleSubmit = e => {
        e.preventDefault();
        formData[formType].submitter();
        // have a way to check for either register() or login()
    }

    const formTitle = (
        <div className={styles.control}>
            <h1 
                className={formType === 'login' ? styles.active : styles.inactive} 
                onClick={() => handleActiveType('login')}>
                Login
            </h1>
            <h1 
                className={formType === 'register' ? styles.active : styles.inactive } 
                onClick={() => handleActiveType('register')}>
                Register
            </h1>
        </div>
    )

    return(
        <>
            { formTitle }

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_group}>
                    <label htmlFor='username'>Username</label>
                    <input className={styles.input} type='text' name='username' onChange={handleChange} value={formData.username}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='password'>Password</label>
                    <input className={styles.input} type={showPassword} name='password' onChange={handleChange} value={formData.password}/>

                    <PasswordEye showPassword={showPassword} handleClick={togglePasswordShow} />
                </div>

                <Button text={formType} handleClick={false} />
            </form>
        </>
    )
}