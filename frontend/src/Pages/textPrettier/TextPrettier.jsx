import React, { useState } from "react";
import {
  Select,
  Textarea,
  Button,
  Box,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { CopyIcon } from "@chakra-ui/icons";
import "./TextPrettier.css";
const TextPrettier = () => {
  const [text, setText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [option, setOption] = useState("");

  // Handle API call to format the text
  const handleFormatText = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3005/api/format_text",
        {
          text,
          options: {
            convertToLowercase: option === "tolowercase",
            convertToUppercase: option === "touppercase",
          },
        }
      );
      setFormattedText(response.data.formattedText);
    } catch (error) {
      console.error("Error formatting text:", error);
    }
  };

  // Handle text reset
  const handleReset = () => {
    setText("");
    setFormattedText("");
    setOption("");
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
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
        <Text className="tool-title-text">TextPrettier</Text>
        <FormControl maxWidth="fit-content">
          <FormLabel>Formatting Options</FormLabel>
          <Select
            placeholder="None"
            value={option}
            onChange={(e) => setOption(e.target.value)}
            maxWidth="12rem"
            mb={4}
          >
            <option value="touppercase">To Uppercase</option>
            <option value="tolowercase">To Lowercase</option>
          </Select>
        </FormControl>
      </Flex>

      <Textarea
        placeholder="Enter your text here..."
        size="md"
        mb={4}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Flex
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={3}
        flexDirection="row"
      >
        <Button colorScheme="teal" maxWidth="8rem" onClick={handleFormatText}>
          Format Text
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          maxWidth="8rem"
          onClick={handleReset}
        >
          Reset Text
        </Button>
      </Flex>

      {formattedText && (
        <Box mt={4}>
          <Flex
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}
            gap={3}
            flexDirection="row"
            marginBottom={4}
          >
            <Text marginBottom="0" className="tool-title-text">
              Formatted Text:
            </Text>
            <Button
              colorScheme="blue"
              variant="outline"
              maxWidth="8rem"
              onClick={handleCopy}
            >
              <CopyIcon mr={2} />
              Copy
            </Button>
          </Flex>
          <Textarea value={formattedText} readOnly size="md" rows={10} />
        </Box>
      )}
    </Stack>
  );
};

export default TextPrettier;
