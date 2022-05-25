import axios from "axios";
import React, { useState, useRef, useEffect } from 'react';
import MyEditor from '../components/editor/editor';
import { Form, Button, Card, Dropdown, DropdownButton, Alert, Spinner } from 'react-bootstrap';
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import MarkdownRenderer from "../components/markdown/markdown";


export  default function Tutorial() {
    const [theme, setTheme] = useState('vs-dark');
    const [lang, setLang] = useState('javascript');
    const [switchText, setSwitchText] = useState('Switch to Light Mode');
    const [editorValue, setEditorValue] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [variant, setVariant] = useState('danger');
    const [markdown, setMarkdown] = useState("");
    const link = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/introduction_tutorial.md";
    const link2 = "https://raw.githubusercontent.com/Block2School/tutorials/master/en/test_file.md";

  

    useEffect(() => {
      axios.get(link2).then(res => {
        console.log('res == ', res.data);
        setMarkdown(res.data);
      });
    }, []);

      const test = "\
    # Introduction\n\n\
    ```js\n\
    import React from 'react';\n\
    ```\n\n\
    ## What is Block2School?\n";
    
    // export const sendRobotRawCode = async (robotName, code) => {
    //   try {
    //     const url = `${process.env.REACT_APP_API_URL}/push/rawcode?robot=${robotName}`;
    //     let response = await postAPI(url, { code: code });
      
    //     if (response['status'] === '200') {
    //       console.log('200');
    //       return true;
    //     }
    //     console.log(response['status']);
    //     return false;
    //   } catch (error) {
    //     console.log(error);
    //     return false;
    //   }
    // };
    
    function changeLang(lang) {
      setLang(lang);
      console.log(lang);
    }
      
    function changeTheme() {
      setSwitchText(theme === 'vs-light' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark');
    }

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
        console.log("editorValue", editorValue);
        if (editorValue.length > 0) {
          let res = await sendRobotRawCode(robot, editorValue);
          if (res === true) {
            setShowError(true);
            setVariant('success');
            setErrorMessage('Code uploaded successfully');
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
        }
    }


    return (
        <div id="screen">
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossOrigin="anonymous"></script>
            <div id="navbar">
                <Navbar/>
            </div>
            <div id="content">
                <div id="subject">
                    <div id="tutorial-content">
                        <div id="zone-text">
                          <MarkdownRenderer source={markdown}/>
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
                            defaultValue="//Bonjour ici Monaco Editor"
                            onChange= { (editorValue) => {
                              setEditorValue(editorValue);
                              console.log(editorValue)
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
        </div>
    );
}
                // <Footer/>