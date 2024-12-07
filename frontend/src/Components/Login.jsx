import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import "../App.css";
import loginimg from "../img/dev_img_2.jpeg";
import useCustomToast from "../hooks/toast.hook";
import userContext from "../context/user/userContext";

const Login = (props) => {
  const host = "https://inotebook-id7a.onrender.com";
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const context = useContext(userContext);
  const { loginUser } = context;
  const { successToast, errorToast } = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const json = await loginUser(credentials.email, credentials.password);
    console.log(json);
    setloading(false);
    if (json.success) {
      // save the verification token and redirect
      localStorage.setItem("token", json.verificationtoken);
      navigate("/");
      successToast({
        title: "User Logged-In",
        description: "You have been logged in Successfully.",
      });
    } else {
      errorToast({
        title: "Invalid Credentials",
        description: "Please provide the correct login details.",
      });
    }
  };
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const movesign = () => {
    navigate("/signup");
  };
  return (
    <div className="conatiner fl-c">
      {loading && <Spinner />}

      <div className={loading ? "login-box" : "login-box"}>
        <div className="signup-box1">
          <img
            className={loading ? "img-box opac" : "img-box"}
            src={loginimg}
            alt=""
          />
          <form className="loginform-box fl-c">
            <h4>Login</h4>

            <div class="  mb-4">
              <label class="form-label" for="form1Example1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="form1Example1"
                onChange={onChange}
                className="auth-input form-control"
              />
            </div>
            <div class="  mb-4">
              <label class="form-label" for="form1Example2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="form1Example2"
                onChange={onChange}
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
              style={{ width: "max-content" }}
            >
              Login
            </button>
            <p onClick={movesign}>
              Already Have an account? <span onClick={movesign}> Sign-Up </span>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
