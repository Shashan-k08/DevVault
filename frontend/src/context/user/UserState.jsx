import React from "react";
import UserContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const userInitial = [];
  const [user, setUser] = useState(userInitial);
  const host = "https://inotebook-id7a.onrender.com";

  const loginUser = async (email, password) => {
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setUser(response.json);
    return response.json;
  };

  const userSignUp = async (name, email, password) => {
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    setUser(response.json);
    return response.json;
  };

  return (
    <UserContext.Provider value={{ loginUser, userSignUp, setUser, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default NoteState;
