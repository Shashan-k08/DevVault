import { Stack, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import "./CodeVault.css";
import axios from "axios";
import CodeVaultmodal from "../../modals/CodeVaultmodal";
import { useEffect } from "react";
const CodeVault = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fetchAllCode = async () => {
    const response = await axios.get(
      "http://localhost:3005/api/devVault/codeVault/getAllSaved"
    );
    console.log(response);
  };
  useEffect(() => {
    try {
      fetchAllCode();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Stack marginTop={4}>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
      >
        <Text className="tool-title-text">CodeVault</Text>

        <Button colorScheme="blue" onClick={onOpen}>
          Add Code
        </Button>
        <CodeVaultmodal onClose={onClose} isOpen={isOpen} />
      </Flex>
    </Stack>
  );
};

export default CodeVault;
