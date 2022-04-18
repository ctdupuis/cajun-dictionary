import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import ModalContext from "../../../context/ModalContext";
import Button from "../../ui/Button/Button";
import PasswordEye from "../../ui/Icons/PasswordEye";
import styles from './auth-form.module.css';

export default function AuthForm(props) {
    const [formType, setFormType] = useState('login');
    const [showPassword, setShowPassword] = useState('password');

    const { login, register } = useContext(AuthContext);
    const { setComponent } = useContext(ModalContext);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({
        login: {
            submitter: (username, password) => login({username, password}),
            active: true
        },
        register: {
            submitter: () => register(userdata),
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
        setUserdata({
            ...userdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setComponent(undefined);
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

    return(
        <>
            { formTitle }

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_group}>
                    <label htmlFor='username'>Username</label>
                    <input className={styles.input} type='text' name='username' onChange={(e) => setUsername(e.target.value)} value={formData.username}/>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor='password'>Password</label>
                    <input className={styles.input} type={showPassword} name='password' onChange={(e) => setPassword(e.target.value)} value={formData.password}/>

                    <PasswordEye showPassword={showPassword} handleClick={togglePasswordShow} />
                </div>

                <Button text={formType} handleClick={formType === 'login' ? () => login({username, password}) : () => register({username, password})} />
            </form>
        </>
    )
}
