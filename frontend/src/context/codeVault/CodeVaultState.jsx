import React from "react";
import codeVaultContext from "./codeVaultContext";
import { useState } from "react";
import axios from "axios";
const CodeVaultState = (props) => {
  const savedCodeInitial = [];
  const [codes, setCodes] = useState(savedCodeInitial);
  const [loading, setLoading] = useState(true);
  const host = "https://inotebook-id7a.onrender.com";
  //const localhost=http://localhost:3005/api/devVault/codeVault/saveCode;
  const fetchAllCode = async () => {
    //setLoading(true);
    const response = await axios.get(
      `${host}/api/devVault/codeVault/getAllSaved`
    );
    setCodes(response.data.data);
    setLoading(false);
  };

  const addNewCode = async (title, language, description, code) => {
    try {
      const res = await axios.post(`${host}/api/devVault/codeVault/saveCode`, {
        title,
        language,
        description,
        code,
      });
      setCodes(res.data.data);
      console.log(codes);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <codeVaultContext.Provider
      value={{ fetchAllCode, codes, setCodes, loading, addNewCode }}
    >
      {props.children}
    </codeVaultContext.Provider>
  );
};

export default CodeVaultState;
