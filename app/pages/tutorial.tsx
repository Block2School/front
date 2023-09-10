import axios from "axios";
import { serverURL } from "../utils/globals";
import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor from '../components/editor/monacoEditor';
import Navbar from "../components/navbar/navbar";
import MarkdownRenderer from "../components/markdown/markdown";
import ScoreBoardModal from "../components/modals/scoreboard/tutorialScoreBoardModal";
import { useRouter } from "next/router";
import {
  useDisclosure,
  Spinner,
  Select,
  Switch,
  HStack,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/react";

import LoadingScreen from "../components/loading/loadingScreen";
import OptionEditor from "../components/editor/optionEditor";
import UploadEditor from "../components/editor/uploadEditor";
import { AiFillBell } from 'react-icons/ai';
import { sendGAEvent } from "../utils/utils";
import TutorialConsole from "../components/tutorialConsole/tutorialConsole";


export interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  modalTitle: string;
  modalMessage: string;
}

export const CustomModal = (props: ModalProps) => {
  const { showModal, setShowModal, modalTitle, modalMessage } = props;
  const { onClose } = useDisclosure();

  if (!showModal) {
    return null;
  }

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.800" />
      <ModalContent
        bg="black"
        color="white"
        textAlign="center"
        maxWidth={400}
        mx="auto"
        mt={20}
        p={4}
        position="relative"
      >
        <AiFillBell style={{ fontSize: "2rem", color: '#ffe6c4' }} />
        <ModalHeader>{modalTitle}</ModalHeader>
        <ModalCloseButton color="#ffe6c4" />
        <ModalBody>
          <img src="/man-yelling.png" id="coach-yelling" height={110} width={110} style={{ margin: "0 auto", display: "block" }} />
          <p>{modalMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="yellow"
            mr={2}
            onClick={() => {
              sendGAEvent('Tutorial', 'button_click', `Close modal ${modalTitle}`)
              setShowModal(false)
            }}
          >
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default function Tutorial() {
  const customHTMLRef = useRef(null);
  const [theme, setTheme] = useState('vs-dark');
  const [lang, setLang] = useState('js');
  const [switchText, setSwitchText] = useState('Switch to Light Mode');
  const [editorValue, setEditorValue] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lineCount, setLineCount] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [variant, setVariant] = useState('danger');
  const [markdown, setMarkdown] = useState('nothing');
  const [scoreBoard, setScoreBoard] = useState<{ data: [{ uuid: string, tutorial_id: number, total_completions: number, language: string, characters: number, lines: number }] }>({ data: [{ uuid: "", tutorial_id: 0, total_completions: 0, language: "", characters: 0, lines: 0 }] });
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { tutorialId } = router.query;
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [resOutput, setResOutput] = useState('');
  const [resError, setResError] = useState('');

  const [tutorialInfos, setTutorialInfos] = useState({
    id: 0,
    title: '',
    markdownUrl: '',
    category: '',
    answer: '',
    startCode: '',
    shouldBeCheck: false,
    enabled: false,
  })


  useEffect(() => {
    setIsLoading(true)
    axios.get(`${serverURL}:8080/tuto/${tutorialId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((res) => {
        setTutorialInfos(res.data)
        setIsLoading(false)
        setShowError(false)
      })
      .catch((err) => {
        setShowError(true)
      })
  }, [tutorialId])

  useEffect(() => {
    if (showError === true || !tutorialId) {
      return
    }
    setIsLoading(true)
    axios.get(tutorialInfos.markdownUrl).then((res) => {
      res.status === 200 ? setMarkdown(res.data) : setMarkdown('')
      setDefaultValue(tutorialInfos.startCode)
      setShowError(false)
      setTimeout(() => setIsLoading(false), 1000)
      setTimeout(() => console.log('tutorialInfos : ', tutorialInfos), 1000)
    })
  }, [tutorialInfos, markdown])

  function editorDidMount(editor) {
    setLineCount(editor.getModel().getLineCount());
    customHTMLRef.current = editor;
  }

  function changeLang(lang: React.SetStateAction<string>) {
    console.log('lang => ', lang)
    setLang(lang)
  }

  function changeTheme() {
    setSwitchText(
      theme === 'vs-light' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    )
    setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')
  }

  function scoring() {
    axios.get(`${serverURL}:8080/tuto/scoreboard/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    }).then(res => {
      console.log(res.data);
      setScoreBoard(res.data);
      onOpen();
      console.log("ZEUBI => ", scoreBoard);
    })
  }

  async function sendUserCode(code: string) {
    console.log("check =>")
    console.log(editorValue.length)
    let execute = true
    if (lang == "solidity") {
      execute = false
    }
    console.log("in sending user code");
    let res = await axios.post(`${serverURL}:8080/tuto/complete`, {
      source_code: code, tutorial_id: tutorialId, total_completions: 100, language: lang, characters: editorValue.length, lines: lineCount, exec: execute
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    })
    console.log("sending following data => ", res.data)
    return res.data;
  }

  async function uploadCode() {

    if (editorValue.length == 0) {
      setShowError(true);
      setErrorMessage('Please enter some code before uploading');
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      setIsUploading(false)
      return
    }
    if (editorValue.length > 0) {
      let res = await sendUserCode(editorValue);
      setResError(res.error ? res.error : '');
      console.log('res.error => ', res.error);
      console.log('res => ', res)
      setResOutput(res.received ? res.received : '[Nothing]');
      console.log('res.received => ', res.received);
      if (res.is_correct == true) {
        setShowModal(true);
        setModalTitle('Correct Answer');
        setModalMessage('Congratulations');
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setIsUploading(false);
      } else {
        setShowModal(true);
        setModalTitle('Wrong Answer');
        setModalMessage('Try again');
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setIsUploading(false);
      }
      setIsUploading(false)
      return
    }
    // else if (editorValue.length > 0 && tutorialInfos.shouldBeCheck == true) {
    //   if (editorValue === tutorialInfos.answer) {
    //     alert('Correct answer')
    //   } else {
    //     console.log(editorValue + " || " + tutorialInfos.answer)
    //     alert('Wrong answer')
    //   }
    // }
  }

  return (
    (isLoading === true) ?
      <>
        <LoadingScreen showError={showError} />
      </> :
      <div id="screen">
        <Navbar />
        <div id="content">
          <div id="subject">
            <div id="tutorial-content">
              <div id="zone-text">
                <CustomModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  modalTitle={modalTitle}
                  modalMessage={modalMessage}
                />
                <MarkdownRenderer source={markdown} />
              </div>
            </div>
            <div
              style={{
                // make it so that the console is always at the bottom of the page
                position: "absolute",
                bottom: 0,
                width: "50%",
                maxHeight: "60%",
                // overflow: 'scroll'
                overflowY: "scroll",
              }}
            >
              <TutorialConsole
                error={resError}
                output={resOutput}
                expectedOutput={tutorialInfos.answer}
              />
            </div>
          </div>
          <div id="editor">
            <OptionEditor changeLang={changeLang} scoring={scoring} switchText={switchText} changeTheme={changeTheme} />
            <div id="editor_edit">
              <MonacoEditor
                theme={theme}
                lang={lang}
                defaultValue={defaultValue}
                options={{
                  wordWrap: true
                }}
                onChange={(editorValue: string) => {
                  setEditorValue(editorValue);
                  setLineCount(customHTMLRef.current.getModel().getLineCount());
                }}
                onMount={editorDidMount}
              />
            </div>
            <UploadEditor isUploading={isUploading} uploadCode={uploadCode} />
          </div>
        </div>
        <ScoreBoardModal isOpen={isOpen} closeModal={onClose} scoreboard={scoreBoard} />
      </div>
  )
}
