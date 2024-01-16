import { Box, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { Spinner } from "react-bootstrap";
import CustomButton from "../button/button";
import { LanguageContext } from "../LanguageSwitcher/language";

export const TestAreaModal = ({
  showModal,
  modalTitle,
  inputs,
  outputs,
  onClose
}: {
  showModal: boolean,
  modalTitle: string,
  inputs: string,
  outputs: string,
  onClose: any,
}) => {

  if (showModal === false) {
    return null;
  }

  return (
    <>
      <Modal isOpen={showModal} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalBody>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <div
                // make it so that the text is above the textarea
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  fontWeight={"bold"}
                >
                  Inputs
                </Text>
                <Textarea
                  value={inputs}
                  placeholder="Left text..."
                  resize={"none"}
                  size={"lg"}
                  readOnly
                />
              </div>
              <div
                // make it so that the text is above the textarea
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  fontWeight={"bold"}
                >
                  Outputs
                </Text>
                <Textarea
                  value={outputs}
                  placeholder="Right text..."
                  resize={"none"}
                  size={"lg"}
                  readOnly
                />
              </div>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export const TestArea = ({
  executeTest, testSuccessful, id, inputs, outputs, isUploading
}: {
  executeTest: any,
  testSuccessful: { id: number, successful: boolean },
  id: number, inputs: string, outputs: string, isUploading: boolean
}) => {
  const { dictionary } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        borderBottom="1px solid white"
        justifyContent={"space-between"}
        paddingLeft={"5%"}
        paddingTop={"2%"}
        paddingBottom={"2%"}
        paddingRight={"5%"}
      >
        <div
          onClick={() => {
            onOpen();
            console.log("isOpen: ", isOpen)
          }}
        >
          <Text
            color={(testSuccessful?.id === id && testSuccessful.successful === true) ? "green" : (testSuccessful?.id === id && testSuccessful.successful === false) ? "red" : "white"}
          >
            Test n°{id}
          </Text>
        </div>
        <CustomButton
          name={dictionary.upload_editorv2.submit_test_button}
          id={"test-area-button"}
          size={"sm"}
          disabled={isUploading}
          variant={"success"}
          onClick={() => {
            executeTest(id);
          }}
          gap={undefined}
          srcImg={undefined}
          alt={undefined}
          hImg={undefined}
          wImg={undefined}
          borderRadius={undefined}
          categoryGA={"Tutorial Upload Editor"}
          labelGA={"Test Button"}
        />
      </Box>
      <TestAreaModal
        showModal={isOpen}
        modalTitle={"Test n°" + id}
        inputs={inputs}
        outputs={outputs}
        onClose={onClose}
        key={"Test n°" + id}
      />
    </>
  );
}

export default function UploadEditorv2({
  isUploading, submitChallenge, executeTest,
  inputs, outputs, testSuccessful
}: {
  isUploading: boolean, submitChallenge: any, executeTest: any,
  inputs: Array<string>, outputs: Array<string>,
  testSuccessful: Array<{ id: number, successful: boolean }>
}) {
  const [isConnected, setIsConnected] = useState(false);
  const { dictionary } = useContext(LanguageContext);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) setIsConnected(true); else setIsConnected(false);
  }, []);

  if (sessionStorage.getItem('token') === null || isConnected === false) {
    return (
      <div id="submit-button2">
        <CustomButton
          name={dictionary.upload_editorv2.login_first}
          id="upload"
          size="lg"
          disabled={true}
          variant="success"
          onClick={submitChallenge}
          gap={undefined}
          srcImg={undefined}
          alt={undefined}
          hImg={undefined}
          wImg={undefined}
          borderRadius={undefined}
          categoryGA={"Tutorial Upload Editor"}
          labelGA={"Submit Button"}
        />
      </div>
    )
  }

  return (
    <div id="submit-button2">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "65%",
          height: "100%",
          borderColor: "white",
          borderWidth: "1px",
          borderRightWidth: "1px",
          overflowY: "scroll"
        }}
      >
        {
          inputs.map((input, index) => {
            return (
              <TestArea
                executeTest={executeTest}
                testSuccessful={testSuccessful[index]}
                id={index + 1}
                inputs={input}
                outputs={outputs[index]}
                isUploading={isUploading}
                key={index}
              />
            )
          })
        }
      </div>
      {
        (isUploading === false) ?
          <CustomButton
            name={dictionary.upload_editorv2.submit_button}
            id="upload"
            size="lg"
            disabled={isUploading}
            variant="success"
            onClick={submitChallenge}
            gap={undefined}
            srcImg={undefined}
            alt={undefined}
            hImg={undefined}
            wImg={undefined}
            borderRadius={undefined}
            categoryGA={"Tutorial Upload Editor"}
            labelGA={"Submit Button Spinner"} /> :
          <Spinner
            animation="border"
            role="status"
          >
            <span className="visually-hidden">
              {dictionary.upload_editorv2.loading}
            </span>
          </Spinner>
      }
    </div>
  );
}