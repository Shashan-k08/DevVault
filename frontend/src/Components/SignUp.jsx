import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
            <form onSubmit={handleSubmit}>

                <div className="mb-3 my-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' id="name" onChange={onchange} minLength={3} required aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' onChange={onchange} required id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onchange} minLength={5} required name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onchange} name='cpassword' id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">SignUp</button>
            </form>
        </div>
    )
}

export default SignUp
