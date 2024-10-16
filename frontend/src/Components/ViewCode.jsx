import { useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useRef, useContext } from "react";
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
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import ViewCodemodal from "../modals/ViewCodemodal";
import codeVaultContext from "../context/codeVault/codeVaultContext";
import ConfirmationModal from "../modals/ConfirmationModal";
const ViewCode = (props) => {
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const { code } = props;
  const [viewDropdown, setViewDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const context = useContext(codeVaultContext);
  const { deleteCode } = context;
  const handleDropdown = () => {
    setViewDropdown(!viewDropdown);
  };
  const handleDelete = () => {
    setViewDropdown(false);
    deleteCode(code._id);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setViewDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
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
        <PiDotsThreeVertical
          className="code_three_dot"
          onClick={handleDropdown}
        />
        {viewDropdown && (
          <div ref={dropdownRef} className="action_dropdown">
            <EditIcon className="dropDown_edit_icon" />
            <hr style={{ marginBottom: "3px", marginTop: "8px" }} />{" "}
            <Text>
              <DeleteIcon
                className="dropDown_delete_icon"
                onClick={handleDelete}
              />
              <ConfirmationModal
                onClose={onDeleteClose}
                isOpen={isDeleteOpen}
              />
            </Text>
          </div>
        )}
      </CardHeader>
      <CardBody>
        <Text>{code.description}</Text>
      </CardBody>
      <CardFooter>
        <Button onClick={onViewOpen}>View Code</Button>
        <ViewCodemodal onClose={onViewClose} isOpen={isViewOpen} code={code} />
      </CardFooter>
    </Card>
  );
};

export default ViewCode;
