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

const CodeFormatter = () => {
  const [code, setCode] = useState("");
  const [formattedCode, setFormattedCode] = useState("");
  const [language, setLanguage] = useState("");

  const handleFormat = async () => {
    try {
      const response = await axios.post("http://localhost:5000/formatCode", {
        code,
        language,
      });
      setFormattedCode(response.data.formattedCode);
    } catch (error) {
      console.error("Failed to format code", error);
    }
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
          <FormLabel>
          Language</FormLabel>
          <Select
            placeholder="Select Language"
            value={language}
            maxWidth="12rem"
            onChange={(e) => setLanguage(e.target.value)}
            mb={4}
          >
            <option value="option1">C++</option>
            <option value="option2">Java</option>
            <option value="option3">Python</option>
            <option value="option3">ReactJs</option>
            <option value="option3">Expressjs</option>
            <option value="option3">HTML</option>
            <option value="option3">CSS</option>
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

      <Button colorScheme="teal" maxWidth="8rem" onClick={handleFormat}>
        Format Code
      </Button>

      {formattedCode && (
        <Box mt={4}>
          <Text fontSize="lg" mb={2}>
            Formatted Code:
          </Text>
          <Textarea value={formattedCode} readOnly size="md" rows={10} />
        </Box>
      )}
    </Stack>
  );
};

export default CodeFormatter;
