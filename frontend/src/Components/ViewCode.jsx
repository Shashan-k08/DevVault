import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import "../Pages/codeVault/CodeVault.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
const ViewCode = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { code } = props;
  return (
  
      <Card align="center">
        <CardHeader>
          <Heading size="md">{code.title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{code.description}</Text>
        </CardBody>
        <CardFooter>See more</CardFooter>
      </Card>
    
  );
};

export default ViewCode;
