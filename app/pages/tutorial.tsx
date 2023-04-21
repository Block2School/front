import axios from "axios";
import { serverURL } from "../utils/globals";
import React, { useState, useRef, useEffect } from 'react';
import MonacoEditor from '../components/editor/monacoEditor';
import Navbar from "../components/navbar/navbar";
import MarkdownRenderer from "../components/markdown/markdown";
import ScoreBoardModal from "../components/modals/scoreboard/tutorialScoreBoardModal";
import { useRouter } from "next/router";
import { useDisclosure, Spinner, Select, Switch, HStack, Text} from "@chakra-ui/react";
import LoadingScreen from "../components/loading/loadingScreen";
import OptionEditor from "../components/editor/optionEditor";
import UploadEditor from "../components/editor/uploadEditor";

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
    let res = await axios.post(`${serverURL}:8080/tuto/complete`, {
      source_code: code, tutorial_id: tutorialId, total_completions: 100, language: lang, characters:editorValue.length, lines:lineCount, exec:execute
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    },)
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
        <LoadingScreen showError={showError}/>
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
              <OptionEditor changeLang={changeLang} scoring={scoring} switchText={switchText} changeTheme={changeTheme}/>
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
              <UploadEditor isUploading={isUploading} uploadCode={uploadCode}/>
            </div>
          </div>
          <ScoreBoardModal isOpen={isOpen} closeModal={onClose} scoreboard={scoreBoard}/>
        </div>
  )
}
