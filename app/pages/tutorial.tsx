import axios from "axios";
import { serverURL } from "../utils/globals";
import React, { useState, useRef, useEffect } from 'react';
import MyEditor from '../components/editor/editor';
import { Form, Button, Card, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import MarkdownRenderer from "../components/markdown/markdown";
import ScoreBoardModal from "../components/modals/tutorialScoreBoardModal";
import { useRouter } from "next/router";
import { Text, Alert, AlertIcon, useDisclosure, List } from "@chakra-ui/react";
import { getAPI, postAPI } from "../utils/api-utils";
import { STATUS_CODES } from "http";

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
  const [scoreBoard, setScoreBoard] = useState<{ data: [{ uuid: string, tutorial_id: number, language: string, characters: number, lines: number }] }>({ data: [{ uuid: "", tutorial_id: 0, language: "", characters: 0, lines: 0 }] });
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { tutorialId } = router.query;

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
    axios
      .get(`${serverURL}:8080/tuto/${tutorialId}`, {
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
    setLang(lang)
  }

  function changeTheme() {
    setSwitchText(
      theme === 'vs-light' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
    )
    setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark')
  }

  function scoring() {
    onOpen();
  }

  async function sendUserCode(code: string) {
    console.log("check =>")
    console.log(editorValue.length)
    let res = await axios.post(`${serverURL}:8080/tuto/complete`, {
      source_code: code, tutorial_id: tutorialId, is_already_checked: false, language: lang, characters:editorValue.length, lines:lineCount
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    },)
    console.log(res.data)
    return res.data;
  }

  async function uploadCode() {
    if (editorValue.length == 0) {
      setShowError(true);
      setErrorMessage('Please enter some code or some blocks before uploading');
      setTimeout(() => {
        setShowError(false)
      }, 3000)
      setIsUploading(false)
      return
    }
    if (editorValue.length > 0 && tutorialInfos.shouldBeCheck == false) {
      console.log('chi')
      console.log(tutorialInfos.answer)
      let res = await sendUserCode(editorValue);
      console.log('pi');
      console.log(res);
      console.log('pou');
      if (res.is_correct == true) {
        setShowError(true);
        setVariant('success');
        setErrorMessage('Code uploaded successfully');
        setTimeout(() => {
          setShowError(false)
          setVariant('danger')
        }, 3000)
        setIsUploading(false)
        alert('Correct answer')
      } else {
        console.log("zeuuuubi")
        setShowError(true)
        setVariant('danger')
        setErrorMessage('Error while uploading code')
        setTimeout(() => {
          setShowError(false)
        }, 3000)
        alert('Wrong answer')
      }
      setIsUploading(false)
      return
    } else if (editorValue.length > 0 && tutorialInfos.shouldBeCheck == true) {
      if (editorValue === tutorialInfos.answer) {
        alert('Correct answer')
      } else {
        alert('Wrong answer')
      }
    }
  }

  return (
    (isLoading === true && showError === false) ?
      <>
        <div id="screen">
          <Navbar />
          <Spinner animation="border" role="status" style={{ top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', position: 'absolute' }}>
          </Spinner>
          <div id="loading-text-tutorial">
            <Text>Loading ...</Text>
          </div>
        </div>
      </> : (showError === true) ?
        <>
          <div id="screen">
            <Navbar />
            <Spinner animation="border" role="status" style={{ top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', position: 'absolute' }}>
            </Spinner>
            <Alert status='error'>
              <AlertIcon />
              There was an error processing your request. Try to refresh the page or contact the administrator.
            </Alert>
          </div>
        </> :
        <div id ="screen">
          <Navbar />
        <div id="content">
          <div id="subject">
            <div id="tutorial-content">
              <div id="zone-text">
                <MarkdownRenderer source={markdown} />
              </div>
            </div>
          </div>
          <div id="editor">
            <div id="editor_opt">
              <Button onClick={() => scoring()}>ScoreBoard</Button>
              <DropdownButton id="lang_choice" variant="dark" title={(lang !== '') ? lang : "Chose Language"}>
                <Dropdown.Item as="button" onClick={() => changeLang('js')}>javascript</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => changeLang('cpp')}>cpp</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => changeLang('python')}>python</Dropdown.Item>
              </DropdownButton>
              <Form id="theme_choice">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label={switchText}
                  onChange={changeTheme}
                />
              </Form>
            </div>
            <div id="editor_edit">
              <MyEditor
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
            <div id="submit-button">
              {(isUploading === false) ? <Button id="upload" size="lg" disabled={isUploading} variant="success" onClick={uploadCode}>Submit</Button> : <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
            </div>
          </div>
        </div>
        <ScoreBoardModal isOpen={isOpen} closeModal={onClose}/>
        </div>
  )
}
