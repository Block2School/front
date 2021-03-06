import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import MyEditor from '../components/editor/editor';
import { Form, Button, Card, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import MarkdownRenderer from "../components/markdown/markdown";
import { useRouter } from "next/router";
import { Text, Alert, AlertIcon } from "@chakra-ui/react";
import { getAPI, postAPI } from "../utils/api-utils";

export default function Tutorial() {
  const [theme, setTheme] = useState('vs-dark');
  const [lang, setLang] = useState('javascript');
  const [switchText, setSwitchText] = useState('Switch to Light Mode');
  const [editorValue, setEditorValue] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [variant, setVariant] = useState('danger');
  const [markdown, setMarkdown] = useState('nothing');
  // const link = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/introduction_tutorial.md";
  // const link2 = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/test_file.md";
  const router = useRouter();
  const { tutorialId } = router.query;

  const [tutorialInfos, setTutorialInfos] = useState({
    id: 0,
    title: "",
    markdownUrl: "",
    category: "",
    answer: "",
    startCode: "",
    shouldBeCheck: false,
    enabled: false
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/tuto/${tutorialId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setTutorialInfos(res.data);
      setIsLoading(false);
      setShowError(false);
    }).catch(err => {
      setShowError(true);
    })
  }, [tutorialId]);

  useEffect(() => {
    if (showError === true || !tutorialId) { return; }
    setIsLoading(true);
    axios.get(tutorialInfos.markdownUrl).then(res => {
      res.status === 200 ? setMarkdown(res.data) : setMarkdown("");
      setDefaultValue(tutorialInfos.startCode);
      setShowError(false);
      setTimeout(() => setIsLoading(false), 1000);
      setTimeout(() => console.log('tutorialInfos : ', tutorialInfos), 1000);
    });
    }, [tutorialInfos, markdown]);

  function changeLang(lang: React.SetStateAction<string>) {
    setLang(lang);
    // console.log(lang);
  }

  function changeTheme() {
    setSwitchText(theme === 'vs-light' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark');
  }

  const sendUserCode = async (code: string) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/tuto/complete`;
      let response = await postAPI(url, { code: code });
    
      if (response['status'] === '200') {
        console.log('200');
        return true;
      }
      console.log(response['status']);
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  async function uploadCode() {
    if (editorValue.length === 0) {
      setShowError(true);
      setErrorMessage('Please enter some code or some blocks before uploading');
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      setIsUploading(false);
      return;
    }
    // console.log("editorValue", editorValue);
    if (editorValue.length > 0 && tutorialInfos.shouldBeCheck === false) {
      let res = await sendUserCode(editorValue); /* insert function to send code to fast api here */
      if (res === true) {
        setShowError(true);
        setVariant('success');
        setErrorMessage('Code uploaded successfully');
        console.log("success");
        setTimeout(() => {
          setShowError(false);
          setVariant('danger');
        }, 3000);
        setIsUploading(false);
      } else {
        setShowError(true);
        setVariant('danger');
        setErrorMessage('Error while uploading code');
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
      setIsUploading(false);
      return;
    } else if (editorValue.length > 0 && tutorialInfos.shouldBeCheck === true) {
      if (editorValue === tutorialInfos.answer) {
        alert('Correct answer');
      } else {
        alert('Wrong answer');
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
      </>:
      <div id="screen">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
        <div id="navbar">
          <Navbar />
        </div>
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
              <DropdownButton id="dropdown-language" variant="dark" title={(lang !== '') ? lang : "Chose Language"}>
                <Dropdown.Item as="button" onClick={() => changeLang('javascript')}>javascript</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => changeLang('cpp')}>cpp</Dropdown.Item>
                <Dropdown.Item as="button" onClick={() => changeLang('python')}>python</Dropdown.Item>
              </DropdownButton>
              <Form>
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
                onChange={(editorValue: string) => {
                  setEditorValue(editorValue);
                  // console.log(editorValue)
                }}
              />
            </div>
            <div id="submit-button">
              <Button id="simulate" size="lg" variant="outline-success">Simulate</Button>
              {(isUploading === false) ? <Button id="upload" size="lg" disabled={isUploading} variant="success" onClick={uploadCode}>Upload</Button> : <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>}
            </div>
          </div>
        </div>
        {/* <Footer/> */}
      </div>
  );
}
// <Footer/>