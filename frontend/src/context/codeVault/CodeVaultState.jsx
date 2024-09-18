import React from "react";
import codeVaultContext from "./codeVaultContext";
import { useState } from "react";
import axios from "axios";
const CodeVaultState = (props) => {
  const savedCodeInitial = [];
  const [codes, setCodes] = useState(savedCodeInitial)
  const host = "https://inotebook-id7a.onrender.com";

  const fetchAllCode = async () => {
    const response = await axios.get(`${host}/api/devVault/codeVault/getAllSaved`);
    setCodes(response.data.data);
  };

  return (
    <codeVaultContext.Provider value={{fetchAllCode,codes,setCodes}}>
      {props.children}
    </codeVaultContext.Provider>
  );
};

export default CodeVaultState;
