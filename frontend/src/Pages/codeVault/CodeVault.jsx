import { Stack, Flex, Text, Button } from "@chakra-ui/react";
import React from "react";
import "./CodeVault.css";
const CodeVault = () => {
  return (
    <Stack marginTop={4}>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
      >
        <Text className="tool-title-text">CodeVault</Text>

        <Button colorScheme="blue" onClick="">
          Add Code
        </Button>
      </Flex>
    </Stack>
  );
};

export default CodeVault;
