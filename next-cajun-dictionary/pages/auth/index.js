import { useState } from "react";

export default function AuthForm(props) {
    const [form, setForm] = useState('login');
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

    return(
        <div className="wrapper">
            <section className="container bg-red1">
                <form>
                    <label htmlFor='username'>Username</label>
                    <input type='text' name='username' />

                    <label htmlFor='password'>Password</label>
                    <input type={showPassword} name='password' />
                    <button onClick={togglePasswordShow}>Show Password</button>
                </form>
            </section>
        </div>
    )
}