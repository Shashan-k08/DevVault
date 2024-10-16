import React from "react";
import codeVaultContext from "./codeVaultContext";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
const CodeVaultState = (props) => {
  const savedCodeInitial = [];
  const [codes, setCodes] = useState(savedCodeInitial);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const host = "https://inotebook-id7a.onrender.com";
  const localhost="http://localhost:3005";
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

  const deleteCode = async (id) => {
    try {
      const res = await axios.delete(
        `${host}/api/devVault/codeVault/deleteCode/${id}`
      );
      setCodes(res.data.data);
      toast({
        title: "Deleted",
        position:"top-right",
        description: "Code Deleted Successfully!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <codeVaultContext.Provider
      value={{ fetchAllCode, codes, setCodes, loading, addNewCode,deleteCode }}
    >
      {props.children}
    </codeVaultContext.Provider>
  );
};

export default CodeVaultState;
