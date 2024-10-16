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
} from "@chakra-ui/react";
const ConfirmationModal = (props) => {
  return (
    <>
      <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center" p={0} mb={4}>
            <Text backgroundColor="#002D62" color="white" padding={1.5}>
              Delete 
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Text>
              Are you sure you want to delete:{" "}
              <span style={{ display: "inline-block", fontWeight: "bold" }}>
                {" "}
                Code
              </span>
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={props.onClose}>
              Delete
            </Button>
            <Button variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
