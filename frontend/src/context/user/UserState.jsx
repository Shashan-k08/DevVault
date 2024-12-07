import React from "react";
import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const userInitial = [];
  const [user, setUser] = useState(userInitial);
  const host = "https://inotebook-id7a.onrender.com";

  const loginUser = async (email, password) => {
    const response = await fetch(`${host}/api/auth/devVault/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    setUser(json);
    return json;
  };

  const userSignUp = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/devVault/createUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    setUser(json);
    return json;
  };

  return (
    <UserContext.Provider value={{ loginUser, userSignUp, setUser, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
