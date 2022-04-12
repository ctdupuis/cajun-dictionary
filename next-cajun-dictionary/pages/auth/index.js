import { useState } from "react";
import PasswordEye from "../../components/ui/Icons/PasswordEye";

export default function AuthForm(props) {
    const [formType, setFormType] = useState('Login');
    const [showPassword, setShowPassword] = useState('password');
    const [formData, setFormData] = useState({
        username: "",
        password: ""
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
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        // have a way to check for either register() or login()
    }

    const handleFormType = () => {
        if (formType === 'Login') {
            setFormType('Register')
        } else if (formType === 'Register') {
            setFormType('Login')
        }
    }

    const formTitle = (
        <div>
            <h1 onClick={() => setFormType('Login')}>Login</h1>
            <h1 onClick={() => setFormType('Register')}>Register</h1>
        </div>
    )

    return(
        <div className="wrapper">
            <section className="container bg-red1">
                { formTitle }
                <form onSubmit={handleSubmit}>

                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' onChange={handleChange} value={formData.username}/>

                    <label htmlFor='password'>Password</label>
                    <input type={showPassword} name='password' onChange={handleChange} value={formData.password}/>

                    <PasswordEye showPassword={showPassword} handleClick={togglePasswordShow} />

                    <button>{formType}</button>
                </form>
            </section>
        </div>
    )
}