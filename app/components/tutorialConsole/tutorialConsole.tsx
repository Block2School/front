import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, Flex, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

interface TutorialConsoleProps {
  output: string;
  expectedOutput: string;
  error: string;
}

export default function TutorialConsole(props: TutorialConsoleProps) {
  const { output, expectedOutput, error } = props;
  const [show, setShow] = useState(false);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Box>
        <div
          style={{
            // make the div take the full width
            width: "100%",

            // align content vertically
            alignItems: "center",

            // add a border
            border: "1px solid #ccc",
            // add some padding

            // add a background color
            backgroundColor: "#f5f5f5",
            // add a box shadow
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
            // add a transition
            transition: "height 0.3s",
          }}
        >
          {/* but the iconButton on the right side */}
          <Flex justifyContent="flex-end">
            <IconButton
              onClick={handleToggle}
              aria-label="Console"
              size={"xs"}
              icon={show ? <ChevronDownIcon /> : <ChevronUpIcon />}
            />
          </Flex>
        </div>
        <Collapse
          in={show}
        >
          <Box
            borderWidth="1px"
            p="4"
            bg="gray.100"
            transition="height 0.3s"
          >
            <Text
              fontSize={"md"}
              fontWeight="bold"
            >
              Ouput:
            </Text>
            <Text>
              {"> " + output}
            </Text>
            <Text
              fontSize={"md"}
              fontWeight="bold"
            >
              Expected output:
            </Text>
            <Text>
              {expectedOutput}
            </Text>
            <Text
              fontSize={"md"}
              fontWeight="bold"
            >
              Error:
            </Text>
            <Text>
              {error}
            </Text>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}