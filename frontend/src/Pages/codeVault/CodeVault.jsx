import { Stack, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import "./CodeVault.css";
import CodeVaultmodal from "../../modals/CodeVaultmodal";
import { useEffect, useContext } from "react";
import codeVaultContext from "../../context/codeVault/codeVaultContext";
const CodeVault = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(codeVaultContext);
  const { fetchAllCode, codes, setCodes } = context;
  fetchAllCode();
  console.log("codevault", codes);

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
