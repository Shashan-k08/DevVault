import { Stack, Flex, Text, Button ,useDisclosure} from "@chakra-ui/react";
import React from "react";
import "./CodeVault.css";
import CodeVaultmodal from "../../modals/CodeVaultmodal";
const CodeVault = () => {
    const { isOpen,onOpen, onClose } = useDisclosure();
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
        <CodeVaultmodal onClose={onClose} isOpen={isOpen}/>
      </Flex>
    </Stack>
  );
};

export default CodeVault;
