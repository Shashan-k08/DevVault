import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalCloseButton,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
const ViewCodemodal = (props) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(props.code.code).then(
      () => {
        console.log("Code copied to clipboard!");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.code.title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {props.code.description}
          </Text>

          <Textarea value={props.code.code} readOnly size="md" rows={10} />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            variant="outline"
            maxWidth="8rem"
            onClick={handleCopy}
          >
            <CopyIcon mr={2} />
            Copy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewCodemodal;
