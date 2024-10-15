import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Textarea,
  Select,
  Flex,
} from "@chakra-ui/react";
import Spinner from "../Components/Spinner";
import { wrap } from "framer-motion";
import axios from "axios";
const CodeVaultmodal = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async () => {
    try {
      setloading(true);
      console.log(code);
      const response = await axios.post(
        "http://localhost:3005/api/devVault/codeVault/saveCode",
        {
          title,
          language,
          description,
          code,
        }
      );
      console.log(response);
      //fetchCodes();
      //setloading(false);
      //props.onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />

        <ModalContent mx={3}>
          <ModalHeader>Save your reusaable & Important code.</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Flex className="vault-modal" flexDirection="row" gap={1}>
              <FormControl>
                <FormLabel>Code Title</FormLabel>
                <Input
                  ref={initialRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Code title"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select
                  placeholder="Select language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="C++">C/C++</option>
                  <option value="Java">Java</option>
                  <option value="Python">Python</option>
                  <option value="Javascript">Javascript</option>
                  <option value="React.js">React.js</option>
                  <option value="Express.js">Express.js</option>
                  <option value="HTML">HTML5</option>
                  <option value="CSS">CSS3</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl mt={4}>
              <FormLabel>Code Description(optional)</FormLabel>
              <Input
                placeholder="Code description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Code</FormLabel>
              <Textarea
                placeholder="Paste or write your code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={props.onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CodeVaultmodal;
