import React, { useState } from "react";
import {
  ChakraProvider,
  Container,
  Select,
  Textarea,
  Button,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { CopyIcon } from "@chakra-ui/icons";
const CodeFormatter = () => {
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [language, setLanguage] = useState("");

  const handleFormat = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/format_code",
        {
          code,
          language,
        }
      );
      console.log(response);
      setFormattedCode(response.data.formattedCode);
    } catch (error) {
      console.error("Failed to format code", error);
    }
  };
  const handleReset = () => {
    setCode("");
    setFormattedCode("");
    setLanguage("");
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(formattedCode).then(
      () => {
        console.log("Formatted code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };
  return (
    <Stack marginTop={4}>
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
        flexDirection="row"
      >
        <Text className="tool-title-text">CodeFormatter</Text>
        <FormControl maxWidth="fit-content">
          <FormLabel>Language</FormLabel>
          <Select
            placeholder="Select Language"
            value={language}
            maxWidth="12rem"
            onChange={(e) => setLanguage(e.target.value)}
            mb={4}
          >
            <option value="javascript">Javascript</option>
            <option value="typescript">Typescript</option>
            <option value="typescript">ReactJs</option>
            <option value="typescript">ExpressJs</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
          </Select>
        </FormControl>
      </Flex>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        size="md"
        mb={4}
        rows={10}
      />
      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
        flexDirection="row"
      >
        <Button colorScheme="teal" maxWidth="8rem" onClick={handleFormat}>
          Format Code
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          maxWidth="8rem"
          onClick={handleReset}
        >
          Reset Code
        </Button>
      </Flex>
      {formattedCode && (
        <Box mt={4}>
          <Flex
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={3}
            flexDirection="row"
            marginBottom={4}
          >
            <Text marginBottom="0" className="tool-title-text">Formatted Code:</Text>
            <Button colorScheme="blue" variant="outline" maxWidth="8rem" onClick={handleCopy}>
              <CopyIcon mr={2} />
              Copy
            </Button>
          </Flex>
          <Textarea value={formattedCode} readOnly size="md" rows={10} />
        </Box>
      )}
    </Stack>
  );
};

export default CodeFormatter;
