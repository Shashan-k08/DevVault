import { Stack, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";
import React from "react";
import "./CodeVault.css";
import CodeVaultmodal from "../../modals/CodeVaultmodal";
import { useEffect, useContext } from "react";
import codeVaultContext from "../../context/codeVault/codeVaultContext";
import { Spinner } from "@chakra-ui/react";
import ViewCode from "../../Components/ViewCode";
const CodeVault = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const context = useContext(codeVaultContext);
  const { fetchAllCode, codes, setCodes, loading } = context;

  if (loading) {
    fetchAllCode();
  }

  useEffect(() => {
    console.log("codevault", codes);
  }, [loading]);

  return (
    <Stack marginTop={4}>
      {loading ? (
        <Flex style={{ position: "absolute", top: "50vh", left: "50%" }}>
          <Spinner color="teal.500" thickness="4px" size="lg" />
        </Flex>
      ) : (
        <>
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
          {codes == null ? (
            <>
              <Flex className="no_code_flexbox">
                <Text className="no_code_text"> No code to display</Text>
                <Button
                  colorScheme="blue"
                  width="max-content"
                  margin="auto"
                  onClick={onOpen}
                >
                  Add Code
                </Button>
              </Flex>
            </>
          ) : (
            <div className=" service-wrapper">
              {codes.map((code) => {
                return (
                  <div className="view_code_card services-card">
                    <ViewCode key={code._id} code={code} />
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </Stack>
  );
};

export default CodeVault;
