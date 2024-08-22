import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import loginimg from "../img/virtual-reality 1.jpg";
import useCustomToast from "../hooks/toast.hook";

const SignUp = (props) => {
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const host = "https://inotebook-id7a.onrender.com";
  let navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    // save the verification token and redirect
    if (json.success) {
      localStorage.setItem("token", json.verificationtoken);
      navigate("/");
      successToast({
        title: "Success",
        description: "Your account have been created Successfully.",
      });
      //props.showalert("Account created Successfully", "success")
    } else {
      errorToast({
        title: "Invalid Credentials",
        description: "Please create account using valid Credentials.",
      });
      // props.showalert("Invalid Credentials", "danger");
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
      <div className="signup-box">
        <div className="signup-box1 fl-r">
          <img className="img-box" src={loginimg} alt="" />
          <form className="form-box fl-c">
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
                class="form-control"
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
                class="form-control"
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
                class="form-control"
              />
            </div>
            <div class="">
              <label class="form-label" for="form2Example2">
                {" "}
                Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                id="form2Example2"
                class="form-control"
              />
            </div>
            <div class="row mb-4">
              <div class="col d-flex justify-content-center">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked
                  />
                  <label class="form-check-label" for="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
              </div>

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
