import React from "react";
import codeVaultContext from "./codeVaultContext";
import { useState } from "react";
import axios from "axios";
const CodeVaultState = (props) => {
  const savedCodeInitial = [];
  const [codes, setCodes] = useState(savedCodeInitial)
  const [loading,setLoading]= useState(true);
  const host = "https://inotebook-id7a.onrender.com";

  const fetchAllCode = async () => {
    //setLoading(true);
    const response = await axios.get(`${host}/api/devVault/codeVault/getAllSaved`);
    setCodes(response.data.data);
    setLoading(false);
  };

  return (
    <codeVaultContext.Provider value={{fetchAllCode,codes,setCodes,loading}}>
      {props.children}
    </codeVaultContext.Provider>
  );
};

export default CodeVaultState;
