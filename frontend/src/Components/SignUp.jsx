import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const SignUp = (props) => {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "" })
    const host = "https://note-me-backend.onrender.com";
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
        <div className='conatiner fl-c'>
            <form className='form-box'>
                <div class="form-outline mb-4">
                    <input type="email" id="form1Example1" class="form-control" />
                    <label class="form-label" for="form1Example1">Email address</label>
                </div>


                <div class="form-outline mb-4">
                    <input type="password" id="form1Example2" class="form-control" />
                    <label class="form-label" for="form1Example2">Password</label>
                </div>


                <div class="row mb-4">
                    <div class="col d-flex justify-content-center">

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                            <label class="form-check-label" for="form1Example3"> Remember me </label>
                        </div>
                    </div>

                    <div class="col">

                        <a href="#!">Forgot password?</a>
                    </div>
                </div>


                <button type="submit" class="btn btn-primary btn-block">Sign in</button>
            </form>
        </div>
    )
}

export default SignUp
