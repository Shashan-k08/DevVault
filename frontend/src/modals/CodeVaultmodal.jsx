import React from "react";
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
  Flex
} from "@chakra-ui/react";
import { wrap } from "framer-motion";
const CodeVaultmodal = (props) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
                <Input ref={initialRef} placeholder="Code title" />
              </FormControl>
              <FormControl>
                <FormLabel>Language</FormLabel>
                <Select placeholder="Select language">
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
            <FormControl mt={4}>
              <FormLabel>Code Description(optional)</FormLabel>
              <Input placeholder="Code description" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Code</FormLabel>
              <Textarea placeholder="Paste or write your code" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
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
