import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import loginimg from "../img/dev_img_2.jpeg";
import useCustomToast from "../hooks/toast.hook";
import userContext from "../context/user/userContext";
import Spinner from "./Spinner";

const SignUp = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = "https://inotebook-id7a.onrender.com";
  let navigate = useNavigate();
  const context = useContext(userContext);
  const { userSignUp } = context;
  const { successToast, errorToast } = useCustomToast();
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const { name, email, password } = credentials;
    const json = await userSignUp(name, email, password);
    console.log(json);
    setloading(false);
    // save the verification token and redirect
    if (json.success) {
      localStorage.setItem("token", json.verificationtoken);
      navigate("/");
      successToast({
        title: "Success",
        description: "Your account have been created Successfully.",
      });
    } else {
      console.log(json);
      errorToast({
        title: "Invalid Credentials",
        description: json.error,
      });
    }
  };
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const movelog = () => {
    navigate("/login");
  };

  return (
    <div className="conatiner fl-c">
      {loading && <Spinner />}
      <div className={loading ? "signup-box opac" : "signup-box"}>
        <div className="signup-box1">
          <img
            className={loading ? "img-box" : "img-box"}
            src={loginimg}
            alt=""
          />
          <form className="signUpForm-box fl-c">
            <h4>Sign-Up</h4>
            <div class="">
              <label class="form-label" htmlFor="form4Example1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="form4Example1"
                onChange={onchange}
                value={credentials.name}
                className="auth-input form-control"
              />
            </div>
            <div class="">
              <label class="form-label" for="form1Example1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="form1Example1"
                onChange={onchange}
                className="auth-input form-control"
              />
            </div>
            <div class="">
              <label class="form-label" for="form1Example2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="form1Example2"
                onChange={onchange}
                className="auth-input form-control"
              />
            </div>

            <div class="row mb-4">
              <div class="col">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              class="btn btn-primary btn-block"
            >
              Sign Up
            </button>
            <p onClick={movelog}>
              Already Have an account? <span onClick={movelog}>Login </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
