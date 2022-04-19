import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import ModalContext from "../../../context/ModalContext";
import Button from "../../ui/Button/Button";
import PasswordEye from "../../ui/Icons/PasswordEye";
import styles from './auth-form.module.css';

export default function AuthForm() {
    const [formType, setFormType] = useState('login');
    const [showPassword, setShowPassword] = useState('password');

    const { login, register, user } = useContext(AuthContext);
    const { setComponent } = useContext(ModalContext);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const togglePasswordShow = () => {
       if (showPassword === 'password') {
            setShowPassword('text')
       } else if (showPassword === 'text') {
            setShowPassword('password')
       }
    }

    const formTitle = (
        <div className={styles.control}>
            <h1 
                className={formType === 'login' ? styles.active : styles.inactive} 
                onClick={() => setFormType('login')}>
                Login
            </h1>
            <h1 
                className={formType === 'register' ? styles.active : styles.inactive } 
                onClick={() => setFormType('register')}>
                Register
            </h1>
        </div>
    )

    if (user) { setComponent(undefined) }

    return(
        <>
            { formTitle }

            <form onSubmit={(e) => e.preventDefault()} className={styles.form}>
                <div className={styles.form_group}>
                    <label htmlFor='username'>Username</label>
                    <input className={styles.input} type='text' name='username' onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='password'>Password</label>
                    <input className={styles.input} type={showPassword} name='password' onChange={(e) => setPassword(e.target.value)} value={password}/>

                </div>
                
                <PasswordEye showPassword={showPassword} handleClick={togglePasswordShow} />

                <div className={styles.btn_container}>
                    <Button 
                        text={formType} 
                        handleClick={ formType === 'login' ? 
                        () => login({username, password}) 
                        : 
                        () => register({username, password}) } 
                    />
                </div>
            </form>
        </>
    )
}
