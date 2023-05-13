import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import bgImg from '../img/img1.jpg';
const SignUp = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    const host ="https://note-me-backend.onrender.com";
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json)
        // save the verification token and redirect
        if (json.success) {
            localStorage.setItem('token', json.verificationtoken);
            navigate("/");
            props.showalert("Account created Successfully", "success")
        }
        else {
            props.showalert("Invalid credentials", "danger")
        }
    }
    const onchange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }



    return (
        <div className='conatiner'>
            <section>
        <div className="register">
            <div className="col-1">
                <h2>Sign In</h2>
                <span>register and enjoy the service</span>

                <form id='form' className='flex flex-col' >
                    <input type="text"  placeholder='username' />
                    <input type="text"  placeholder='password' />
                    <input type="text"  placeholder='confirm password' />
                    <input type="text"  placeholder='mobile number' />
                   
                   
                    <button className='btn1'>Sign In</button>
                </form>

            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    </section>
        </div>
    )
}

export default SignUp
