import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Collapse, Flex, Grid, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";

interface TutorialConsoleProps {
  output: string;
  expectedOutput: string;
  error: string;
}

export default function TutorialConsole(props: TutorialConsoleProps) {
  const { output, expectedOutput, error } = props;
  const [show, setShow] = useState(true);

  const handleToggle = () => setShow(!show);

  return (
    <>
      <Box>
        <div
          style={{
            width: "100%",
            alignItems: "center",
            border: "1px solid #ccc",
            backgroundColor: "#f5f5f5",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
            transition: "height 0.3s"
          }}
        >
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={4}
            paddingLeft={"4"}
            paddingRight={"4"}
            paddingTop={"2"}
            paddingBottom={"2"}
          >
            <Text
              fontSize={"md"}
              fontWeight="bold"
              color="black"
            >
              Console
            </Text>
            <Flex justifyContent="flex-end">
              <IconButton
                onClick={handleToggle}
                aria-label="Console"
                size={"xs"}
                icon={show ? <ChevronDownIcon /> : <ChevronUpIcon />}
                color={"black"}
              />
            </Flex>
          </Grid>

        </div>
        <Collapse
          in={show}
          animateOpacity
        >
          <Box
            borderWidth="1px"
            paddingLeft={"4"}
            bg="gray.100"
            transition="height 0.3s"
          >
            <Text
              fontSize={"md"}
              fontWeight="bold"
              color={"black"}
            >
              Ouput:
            </Text>
            <Text
              whiteSpace="pre-wrap"
              color={"black"}
            >
              {"> " + output?.replaceAll("\n", "\n> ")}
            </Text>
            <Text
              fontSize={"md"}
              fontWeight="bold"
              color={"black"}
            >
              Expected output:
            </Text>
            <Text
              whiteSpace="pre-wrap"
              color={"black"}
            >
              {expectedOutput}
            </Text>
            <Text
              fontSize={"md"}
              fontWeight="bold"
              color={"black"}
            >
              Error:
            </Text>
            <Text
              color={"black"}
            >
              {error}
            </Text>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}