import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import "../Pages/codeVault/CodeVault.css";
import { IoLogoJavascript } from "react-icons/io5";
import { RiReactjsLine } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoCss3 } from "react-icons/io";
import { FaPython } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { PiDotsThreeVertical } from "react-icons/pi";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
const ViewCode = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { code } = props;
  return (
    <Card align="center">
      <CardHeader>
        <Heading size="md">{code.title}</Heading>

        {code.language == "React.js" && <RiReactjsLine />}
        {code.language == "Javascript" && <IoLogoJavascript />}
        {code.language == "Express.js" && <FaNodeJs />}
        {code.language == "Java" && <FaJava />}
        {code.language == "C++" && <SiCplusplus />}
        {code.language == "Python" && <FaPython />}
        {code.language == "HTML" && <FaHtml5 />}
        {code.language == "CSS" && <IoLogoCss3 />}
        <PiDotsThreeVertical className="code_three_dot" />
      </CardHeader>
      <CardBody>
        <Text>{code.description}</Text>
      </CardBody>
      <CardFooter>
        <Button>View Code</Button>
      </CardFooter>
    </Card>
  );
};

export default ViewCode;
