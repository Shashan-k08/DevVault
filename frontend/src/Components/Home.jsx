import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { SearchIcon, ExternalLinkIcon } from "@chakra-ui/icons";

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const tools = [
    {
      name: "CodeVault",
      description: "Keep Your Reusable Code Safely and Securely",
      path: "/devVault/codeVault",
    },
    {
      name: "Code-Formatter",
      description: "Effortlessly format C++, Java, and Python code",
      path: "/devVault/codeFormatter",
    },
    {
      name: "RegexBuilder",
      description:
        "Create, test, and refine your regular expressions with ease.",
      path: "/devVault/regexBuilder",
    },
    {
      name: "Text Formatter",
      description: "Seamlessly format and clean up your text.",
      path: "/devVault/textFormatter",
    },
    {
      name: "NoteSafe",
      description: "Save The important Notes Securely",
      path: "/devVault/noteSafe",
    },
    {
      name: "SafeKeep",
      description: "Keep The Important documents Securely",
      path: "/devVault/safeKeep",
    },
  ];

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <div className="fl-c service-wrapper">
      <h2>Safeguard and Streamline Your Development Workspace</h2>
      <h6>
        Essential Tools for Developers: Secure Your Code, Notes, and Documents
      </h6>

      <InputGroup mb={4} maxWidth="400px" mx="auto">
        <Input
          placeholder="Search tools"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <InputRightElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputRightElement>
      </InputGroup>

      {/* Tools Display */}
      <div className="services-card">
        {filteredTools.map((tool, index) => (
          <Card key={index} align="center" onClick={() => handleCardClick(tool.path)}>
            <CardHeader>
              <Heading size="md">{tool.name}</Heading>
            </CardHeader>
            <CardBody>
              <Text>{tool.description}</Text>
            </CardBody>
            <CardFooter>
              See more <ExternalLinkIcon />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
