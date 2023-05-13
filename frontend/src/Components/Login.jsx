import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const host ="https://note-me-backend.onrender.com";
    const [credentials, setcredentials] = useState({ email: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json)
        if(json.success)
        {
            // save the verification token and redirect
            localStorage.setItem('token',json.verificationtoken);
            navigate("/");
            props.showalert("Logged-in Successfully", "success")

        }
        else
        {
            props.showalert("Invalid details","danger")
        }
    }
    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name='email' id="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
