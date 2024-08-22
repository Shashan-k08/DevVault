import React from 'react'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';
import '../App.css'
import loginimg from '../img/virtual-reality 1.jpg'
import { MDBInput } from 'mdb-react-ui-kit';

const Login = (props) => {
    const host = "https://inotebook-id7a.onrender.com";
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json();
        setloading(false);
        console.log(json)
        if (json.success) {
            // save the verification token and redirect
            localStorage.setItem('token', json.verificationtoken);
            navigate("/");
            props.showalert("Logged-in Successfully", "success")

        }
        else {
            props.showalert("Invalid details", "danger")
        }
    }
    const onChange = (e) => {
         setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const movesign = () => {
        navigate('/signup')
    }
    return (
        <div className='conatiner fl-c'>
            {loading ? <Spinner /> :
                <div className="login-box">

                    <div className="signup-box1 fl-r">
                        <img className="img-box" src={loginimg} alt="" />
                        <form className='loginform-box fl-c'>
                            <h4>Login</h4>

                            <div class="  mb-4">
                            <label class="form-label" for="form1Example1">Email address</label>
                                <input type="email" name="email" id="form1Example1" onChange={onChange} class="form-control" />
                               
                            </div>
                            <div class="  mb-4">
                            <label class="form-label" for="form1Example2">Password</label>
                                <input type="password" name="password" id="form1Example2" onChange={onChange} class="form-control" />
                               
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



                            <button type="submit" onClick={handleSubmit} class="btn btn-primary btn-block">Login</button>
                            <p onClick={movesign}>Already Have an account? <span onClick={movesign}> Sign-Up </span> </p>
                        </form>
                    </div>
                </div>}
        </div>
    )
}

export default Login