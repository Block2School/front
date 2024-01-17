import axios from "axios";
import react, { useEffect, useState, useContext, useRef } from "react";
import { webSocketURL } from "../utils/globals";
import Navbar from "../components/navbar/navbar";
import { serverURL } from "../utils/globals";
import { LanguageContext } from "../components/LanguageSwitcher/language";
import MarkdownRenderer from "../components/markdown/markdown";
import TutorialConsole from "../components/tutorialConsole/tutorialConsole";
import OptionEditorv2 from "../components/editor/optionEditorv2";
import LoadingScreen from "../components/loading/loadingScreen";
import UploadEditorv2 from "../components/editor/uploadEditorv2";
import MonacoEditorv2 from "../components/editor/monacoEditorv2";
import { formatLanguageToServerLanguage, sendGAEvent } from "../utils/utils";
import { AiFillBell } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";

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
              sendGAEvent('Challenge', 'button_click', `Close modal ${modalTitle}`)
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

export default function ChallengeFriends() {
  const customHTMLRef = useRef(null);
  const { dictionary } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('vs-light');
  const [lang, setLang] = useState('py');
  const [switchText, setSwitchText] = useState(dictionary.challenge_page.challenge_switch_text1);
  const [editorValue, setEditorValue] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [markdown, setMarkdown] = useState('nothing');
  const [resOutput, setResOutput] = useState('');
  const [resError, setResError] = useState('');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [playerUUID, setPlayer] = useState('');

  const [testSuccessful, setTestSuccessful] = useState<Array<{
    id: number,
    successful: boolean
  }>>([]);

  const [challenge, setChallenge] = useState<{
    id: number,
    inputs: Array<string>,
    answers: Array<string>,
    markdown_url: string,
    start_code: string,
    points: number,
    title: string,
    language: string,
    already_completed: boolean,
    completed_at: string,
  }>();

  const [socketInfo, setSocketInfo] = useState<{
    nbr_success_test : number,
    nbr_tests : number,
    code : string,
    nbr_char : number,
    language : string,
    userID : string,
  }>();

  useEffect(() => {
    if (!challenge?.inputs) return;
    let _testSuccessful = []
    for (let i = 0; i < challenge.inputs.length || 0; i++) {
      _testSuccessful.push({ id: -1, successful: false });
    }
    setTestSuccessful(_testSuccessful);
  }, [challenge])

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${serverURL}:8080/challenges/start_challenge/v2`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
      const challenge = {
        id: res.data?.id || -1,
        inputs: res.data?.inputs || [],
        answers: res.data?.answers || [],
        markdown_url: res.data?.markdown_url || '',
        start_code: res.data?.start_code || '',
        points: res.data?.points || 0,
        title: res.data?.title || '',
        language: res.data?.language || '',
        already_completed: res.data?.already_completed || false,
        completed_at: res.data?.completed_at || ''
      }
      setChallenge(challenge);
      setEditorValue(challenge.start_code);
      setDefaultValue(challenge.start_code);
      setIsLoading(false);
      fetchProfile();
      axios.get(challenge.markdown_url).then((res) => {
        res.status === 200 ? setMarkdown(res.data) : setMarkdown('Error while loading markdown file');
      })
      setMarkdown(challenge.markdown_url);
      let socket = new WebSocket(`ws://` + webSocketURL + `:8080/joinRoom/` + _roomId + `/` + playerUUID)
    })
  }, [])

  useEffect(() => {
    changeTheme();
  }, [dictionary])

  const handleEditorChange = (value: string) => {
    setEditorValue(value);
  }

  const changeTheme = () => {
    setSwitchText(theme === 'vs-light' ? dictionary.challenge_page.challenge_switch_text1 : dictionary.challenge_page.challenge_switch_text2);
    setTheme(theme === 'vs-dark' ? 'vs-light' : 'vs-dark');
  }

  const editorDidMount = (editor: any) => {
    customHTMLRef.current = editor;
  }

  const uploadCode = () => {
    setIsUploading(true);

    const data = {
      code: editorValue,
      language: formatLanguageToServerLanguage(challenge?.language || '')
    }

    axios.post(`${serverURL}:8080/challenges/submit_challenge/${challenge?.id}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(res => {
        setResOutput(res.data.output);
        setExpectedOutput(res.data.expected_output);
        setResError(res.data.error_description);
        setShowModal(true);
        if (res.data.success === true) {
          setModalTitle('Correct Answer');
          setModalMessage('Congratulations');
          let _testSuccessful = [...testSuccessful];
          for (let idx: number = 0; idx < _testSuccessful.length; idx++) {
            _testSuccessful[idx].successful = true;
            _testSuccessful[idx].id = idx + 1;
          }
          setTestSuccessful(_testSuccessful);
        } else {
          setModalTitle('Wrong Answer');
          setModalMessage('Try again');
          let _testSuccessful = [...testSuccessful];
          if (res.data.error_test_index > 0) {
            for (let idx: number = 0; idx < _testSuccessful.length; idx++) {
              if (idx === res.data.error_test_index - 1) {
                _testSuccessful[idx].successful = false;
                _testSuccessful[idx].id = idx + 1;
              } else if (idx > res.data.error_test_index - 1) {
                _testSuccessful[idx].successful = false;
                _testSuccessful[idx].id = -1;
              } else {
                _testSuccessful[idx].successful = true;
                _testSuccessful[idx].id = idx + 1;
              }
            }
          } else {
            for (let idx: number = 0; idx < _testSuccessful.length; idx++) {
              _testSuccessful[idx].successful = false;
              _testSuccessful[idx].id = idx + 1;
            }
          }
          setTestSuccessful(_testSuccessful);
        }

        let successTestNbr = 0;
        for (let idx: number = 0; idx < testSuccessful.length; idx++) {
          if (testSuccessful[idx].successful === true){
            successTestNbr += 1;
          }
        };

        fetchProfile();

        const infos = {
          nbr_success_test : successTestNbr,
          nbr_tests : testSuccessful.length,
          code : data.code,
          nbr_char : data.code.length,
          language : data.language,
          userID : playerUUID,
        }
        setSocketInfo(infos);

        let socketinfo = JSON.stringify(infos);

        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setIsUploading(false);
      }).catch(err => {
        setShowModal(true);
        setModalTitle('Wrong Answer');
        setModalMessage('Try again');
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        setIsUploading(false);
      })
  }

  const executeTest = (test_number: number) => {
    setIsUploading(true);

    const data = {
      code: editorValue,
      language: formatLanguageToServerLanguage(challenge?.language || '')
    }

    axios.post(`${serverURL}:8080/challenges/test_challenge/${challenge?.id}/${test_number}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(res => {
        setResOutput(res.data.output);
        setExpectedOutput(res.data.expected_output);
        setResError(res.data.error_description);
        let _testSuccessful = [...testSuccessful];
        _testSuccessful[test_number - 1].successful = res.data.success;
        _testSuccessful[test_number - 1].id = test_number;
        setTestSuccessful(_testSuccessful);
        setIsUploading(false);
      }).catch(err => {
        setIsUploading(false);
      })
  }

  const changeLang = (lang: React.SetStateAction<string>) => {
    setLang(lang);
  }

  function fetchProfile() {
    axios.get(`${serverURL}:8080/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPlayer(res.data.uuid);
        }
      })
  }

  return (
    (isLoading === true) ?
      <>
        <LoadingScreen showError={false} />
      </> :
      <>
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
                  overflowY: "scroll",
                }}
              >
                <TutorialConsole
                  error={resError}
                  output={resOutput}
                  expectedOutput={expectedOutput}
                />
              </div>
            </div>
            <div id="editor">
              <OptionEditorv2
                changeLang={changeLang}
                changeTheme={changeTheme}
                switchText={switchText}
                selectDefaultText={dictionary.challenge_page.challenge_select_default_option_editor}
                language={lang}
                wasAlreadyCompleted={challenge?.already_completed || false}
              />
              <div id="editor_edit">
                <MonacoEditorv2
                  theme={theme}
                  lang={lang}
                  defaultValue={defaultValue}
                  options={{
                    wordWrap: true
                  }}
                  onChange={handleEditorChange}
                  onMount={editorDidMount}
                  height="90%"
                  width="100%"
                />
              </div>
              <UploadEditorv2
                isUploading={isUploading}
                submitChallenge={uploadCode}
                executeTest={executeTest}
                inputs={challenge?.inputs || []}
                outputs={challenge?.answers || []}
                testSuccessful={testSuccessful}
              />
            </div>
          </div>
        </div>
      </>
  );
}