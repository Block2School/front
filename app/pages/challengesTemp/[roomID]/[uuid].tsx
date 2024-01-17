import axios from "axios";
import { useEffect, useRef, useState, useContext } from "react";
import Navbar from "../../../components/navbar/navbar";
import { Text, SimpleGrid, Box, useClipboard } from "@chakra-ui/react";
import { serverURL, webSocketURL } from "../../../utils/globals";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import LoadingScreen from "../../../components/loading/loadingScreen";
import { CustomModal } from "../../challenge";
import MarkdownRenderer from "../../../components/markdown/markdown";
import TutorialConsole from "../../../components/tutorialConsole/tutorialConsole";
import MonacoEditorv2 from "../../../components/editor/monacoEditorv2";
import UploadEditorv2 from "../../../components/editor/uploadEditorv2";
import OptionEditorv2 from "../../../components/editor/optionEditorv2";
import { LanguageContext } from "../../../components/LanguageSwitcher/language";
import { formatLanguageToServerLanguage, sendGAEvent } from "../../../utils/utils";

export interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  modalTitle: string;
  modalMessage: string;
}

///////////////////////////////////////////////////////////////////////////

export default function ChallengesTemp() {
  const router = useRouter();
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

  const [roomResults, setRoomResults] = useState<Array<{
    user_id: string,
    username: string,
    total_tests: number,
    passed_tests: number,
    code: string,
    chars: number,
    time_spent: number,
  }>>([]);

  const [testSuccessful, setTestSuccessful] = useState<Array<{
    id: number,
    successful: boolean
  }>>([]);

  const { roomID, uuid } = router.query;
  const [time, setTime] = useState({ minutes: 2, seconds: 0 });
  const [playingTimer, setPlayingTimer] = useState({ minutes: 5, seconds: 0 });
  const [ws, setWs] = useState<WebSocket | null>(null);
  let check: boolean = false;
  const [roomJoined, setRoomJoined] = useState(false);
  const [player, setPlayer] = useState<{ username: string, uuid: string, points: string }>({ username: "", uuid: "", points: "" })
  const [lastMessage, setLastMessage] = useState();
  const [roomState, setRoomState] = useState<'waiting' | 'playing' | 'finished'>('waiting');

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

  const [room, setRoom] = useState<{
    master: string,
    occupants: [{
      userId: string,
      username: string,
    }],
    maxTime: number,
    limitUser: number,
    challengeId: number,
  }>({
    master: '',
    occupants: [{
      userId: '',
      username: '',
    }],
    maxTime: 0,
    limitUser: 2,
    challengeId: -1,
  });

  useEffect(() => {
    if (!challenge?.inputs) return;
    let _testSuccessful = []
    for (let i = 0; i < challenge.inputs.length || 0; i++) {
      _testSuccessful.push({ id: -1, successful: false });
    }
    setTestSuccessful(_testSuccessful);
  }, [challenge])

  const [loadChallengeAfterTimer, setLoadChallengeAfterTimer] = useState(false);
  const [startLastTimer, setStartLastTimer] = useState(false);

  useEffect(() => {
    const _handleReload = async (url: string) => {
      if (url === '/challenges') return;
      await quitLobby();
    }

    router.events.on('routeChangeStart', _handleReload);

    return () => {
      router.events.off('routeChangeStart', _handleReload);
    }
  }, [router])

  const { onCopy, value, hasCopied } = useClipboard(`${serverURL}:3000/challengesTemp/` + roomID);

  const changeLang = (lang: React.SetStateAction<string>) => {
    setLang(lang);
  }

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

  useEffect(() => {
    changeTheme();
  }, [dictionary])

  const getChallenge = async () => {
    let res = await axios.get(`${serverURL}:8080/challenges/start_challenge_with_friends/` + room.challengeId, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    setChallenge(res.data);
    setDefaultValue(res.data.start_code);
    setEditorValue(res.data.start_code);
    axios.get(res.data.markdown_url).then((res) => {
      res.status === 200 ? setMarkdown(res.data) : setMarkdown('')
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if (loadChallengeAfterTimer === false || room.challengeId === -1) return;
    const onPlaying = async () => {
      await getChallenge();
    }
    onPlaying();
    setRoomState('playing');
  }, [loadChallengeAfterTimer])

  useEffect(() => {

    const onRoomCreated = async () => {
      await fetchRoom();
    }

    if (check === false) {
      onRoomCreated();
      check = true;
    }

    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {
          setLoadChallengeAfterTimer(true);
          clearInterval(timer);
          return prevTime;
        }
        if (prevTime.seconds === 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (roomJoined == false && roomID && uuid) {
      joinRoom();
      setRoomJoined(true);
      fetchRoom();
    }
  }, [room])

  useEffect(() => {
    if (!roomID || !uuid)
      router.push("/challenges");
  }, [roomID, uuid])

  async function fetchRoom() {
    if (!roomID) {
      ws?.close();
      return;
    }
    try {
      let res = await axios.get(`${serverURL}:8080/challenges/getRoomById/` + roomID, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      setRoom(res.data);
    } catch (error) {
      ws?.close();
      setRoom({
        master: '',
        occupants: [{
          userId: '',
          username: '',
        }],
        maxTime: 0,
        limitUser: 2,
        challengeId: -1,
      })
    }
  }

  async function joinRoom() {

    var socket = new WebSocket(`ws://` + webSocketURL + `:8080/joinRoom/` + roomID + `/` + uuid)
    setWs(socket);

    if (socket) {
      socket.onopen = () => {
      };

      socket.onmessage = (e) => {
        setLastMessage(e.data);
      };

      socket.onclose = () => {
      };
    }
  }

  useEffect(() => {
    if (lastMessage) {
      parseMessage(lastMessage);
    }
  }, [lastMessage])

  const parseMessage = (message: string) => {
    const data = JSON.parse(message);
    switch (data.type) {
      case "new user joined":
        let _myRoom: any = {};
        Object.assign(_myRoom, room);
        _myRoom.occupants.push(data.message);
        setRoom(_myRoom);
        break;
      case "room info":
        if (data.message?.remainingTime == undefined) break;
        setTime({ minutes: Math.floor(data.message.remainingTime / 60), seconds: data.message.remainingTime % 60 })

        let myRoom: any = {};
        Object.assign(myRoom, room);
        Object.assign(myRoom.occupants, data.message.occupants);
        Object.assign(myRoom.challengeId, data.message.challengeId);
        setRoom(myRoom);
        break;
      case "joinRoom":
        let myRoomData: any = {};
        Object.assign(myRoomData, room);
        Object.assign(myRoomData.occupants, data.message.occupants);
        Object.assign(myRoomData.challengeId, data.message.challengeId);
        setRoom(myRoomData);
        break;
      case "userLeft":
        let _myRoom2: any = {};
        Object.assign(_myRoom2, room);
        _myRoom2.occupants = data.message.occupants;
        setRoom(_myRoom2);
        break;
      case "leaveRoom":
        break;
      case "startGame":
        break;
      case "endGame":
        break;
      case "user_submited":

        setRoomResults(data.message);
        break;
      case "room_deleted":
        ws?.close();
        break;
      default:
        break;
    }
  }

  async function leaveRoom() {
    let res = await axios.post(`${serverURL}:8080/challenges/leaveRoom/` + roomID + `/` + uuid, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
  }

  async function deleteRoom() {
    let res = await axios.post(`${serverURL}:8080/challenges/deleteRoom/` + roomID, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
      },
    })
    fetchRoom()
  }

  async function quitLobby() {
    await fetchRoom();
    if (ws) {
      if (room.master == uuid && ws.readyState === WebSocket.OPEN) {
        await destroyLobby()
        return
      }
      await leaveLobby();
    }
    return;
  }

  async function leaveLobby() {
    await leaveRoom();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("leaveRoom");
    }
    router.push("/challenges")
  }

  async function leaveLobbyV2() {
    await leaveRoom();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("leaveRoom");
    }
  }

  async function destroyLobby() {
    await leaveLobby();
    await deleteRoom();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("leaveRoom")
      ws.send("deleteRoom")
      ws.close();
    }
  }

  async function destroyLobbyV2() {
    await leaveLobbyV2();
    await deleteRoom();
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("leaveRoom")
      ws.send("deleteRoom")
      ws.close();
    }
  }

  //////////////////// EXECUTE TEST //////////////////////
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

  /////////////////////////////////////////////////////////////

  //////////////////// SOCKET SUBMIT //////////////////////
  const socket_submit = () => {

    const data = {
      code: editorValue,
      language: formatLanguageToServerLanguage(challenge?.language || '')
    }

    axios.post(`${serverURL}:8080/challenges/multi/user_submit/${roomID}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      }).then(res => {
        setRoomState('finished');
      }).catch(err => {
        setIsUploading(false);
      })
  }

  /////////////////////////////////////////////////////////////

  const handleDisconnection = () => {
    setTimeout(async () => {
      if (ws) {
        if (ws.readyState === WebSocket.OPEN && room.master === uuid) {
          await destroyLobbyV2();
          return;
        }
        await leaveLobbyV2();
      }
    }, 60000);
  }

  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    ws?.addEventListener('close', () => {
      ws.close();
    });
    ws?.addEventListener('error', () => {
      ws.close();
    });
    if (ws?.readyState == WebSocket.CLOSED) {
      ws.close();
    }
  }, [ws])

  useEffect(() => {
    if (shouldSubmit === false) return;
    socket_submit();
    setRoomState('finished');
  }, [shouldSubmit]);

  useEffect(() => {
    if (roomState === 'playing') {
      handlePlayingTimer();
      return;
    }
  }, [roomState]);

  useEffect(() => {
    if (startLastTimer === false || roomState !== 'finished') return;
    handleDisconnection();
  }, [startLastTimer, roomState]);

  const handlePlayingTimer = () => {
    const _timer = setInterval(() => {
      setPlayingTimer(prevTime => {
        if (prevTime.minutes === 0 && prevTime.seconds === 0) {

          setShouldSubmit(true);
          setStartLastTimer(true);

          clearInterval(_timer);
          return prevTime;
        }
        if (prevTime.seconds === 0) {
          return { minutes: prevTime.minutes - 1, seconds: 59 };
        } else {
          return { minutes: prevTime.minutes, seconds: prevTime.seconds - 1 };
        }
      });
    }, 1000);

    return () => clearInterval(_timer);
  }

  const [showUserSubmittedInfosID, setShowUserSubmittedInfosID] = useState(-1);
  const [codeToBeDisplayed, setCodeToBeDisplayed] = useState('');

  const showUserSubmittedInfos = (id: number, code: string) => {
    setShowUserSubmittedInfosID(id);

    let _formated = "```" + lang + "\n" + code + "\n```";

    setCodeToBeDisplayed(_formated);
  }

  if (roomState === 'waiting')
    return (
      <>
        <div id="screen" style={{ height: "100vh" }}>
          <Navbar />
          <div id="content" style={{
            flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "calc(100vh - 95px)", width: "100%"
          }}>
            <Button onClick={onCopy}>{dictionary.challenge_with_friends.copy_link}</Button>
            <div id="time" style={{ color: "#ffe6c4", fontSize: "85px", justifyContent: "center", alignItems: "center", height: "175px" }}>
              {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
            </div>
            <div id="users" style={{ height: "50%", width: "50%" }}>
              <SimpleGrid
                columns={2}
                gap={6}
                height={"100%"}
                flexWrap={"wrap"}
                alignItems={"stretch"}
                gridAutoRows={"1fr"}
              >
                <Box
                  bg='#ffe6c4'
                  height={"100%"}
                  paddingInline={"5%"}
                >
                  <Text>
                    {(room?.occupants.at(0)) ? room?.occupants.at(0)?.username : 'Empty seat'}
                  </Text>
                </Box>
                <Box
                  bg='#ffe6c4'
                  height={"100%"}
                  paddingInline={"5%"}
                >
                  {(room?.occupants.at(1)) ? room?.occupants.at(1)?.username : 'Empty seat'}
                </Box>
                <Box
                  bg='#ffe6c4'
                  height={"100%"}
                  paddingInline={"5%"}
                >
                  {(room?.occupants.at(2)) ? room?.occupants.at(2)?.username : 'Empty seat'}
                </Box>
                <Box
                  bg='#ffe6c4'
                  height={"100%"}
                  paddingInline={"5%"}
                >
                  {(room?.occupants.at(3)) ? room?.occupants.at(3)?.username : 'Empty seat'}
                </Box>
              </SimpleGrid>
            </div>
            <div id="options" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "50%", height: "150px" }}>
              <Button onClick={() => quitLobby()}>{dictionary.challenge_with_friends.quit}</Button>
            </div>
          </div>
        </div>
      </>
    );
  else if (roomState === 'playing')
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
                  playingTimer={playingTimer}
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
                  submitChallenge={socket_submit}
                  executeTest={executeTest}
                  inputs={challenge?.inputs || []}
                  outputs={challenge?.answers || []}
                  testSuccessful={testSuccessful}
                />
              </div>
            </div>
          </div>
        </>
    )
  else
    return (
      <>
        <div id="screen" style={{ height: "100vh" }}>
          <Navbar />
          <div id="content" style={{
            flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "calc(100vh - 95px)", width: "100%"
          }}>
            <div id="result"></div>
            <div id="users" style={{ height: "50%", width: "70%" }}>
              <SimpleGrid
                columns={1}
                gap={6}
                height={"100%"}
                flexWrap={"wrap"}
                alignItems={"stretch"}
                gridAutoRows={"0.3fr"}
              >
                {
                  roomResults.map((item, index) => {
                    return (
                      <Box bg='#ffe6c4' key={index}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2%" }}>
                          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Text
                              fontSize="l"
                              fontWeight="bold"
                            >
                              {item.username}
                            </Text>
                            <Text>{dictionary.challenge_with_friends.test_passed}: {item.passed_tests} / {item.total_tests}</Text>
                            <Text>{dictionary.challenge_with_friends.time_spent}: {item.time_spent} {dictionary.challenge_with_friends.seconds}</Text>
                            <Text>{dictionary.challenge_with_friends.chars}: {item.chars}</Text>
                            {
                              (showUserSubmittedInfosID === index) ?
                                <div style={{ width: "100%", height: "150px", maxHeight: "10%", padding: "2%", overflow: "scroll" }}>
                                  <MarkdownRenderer source={codeToBeDisplayed} />
                                </div>
                                : <></>
                            }
                          </div>
                          <div>
                            <Button onClick={() => { showUserSubmittedInfos(index, item.code) }}>Code</Button>
                          </div>
                        </div>
                      </Box>
                    );
                  })
                }
              </SimpleGrid>
            </div>
            <div id="options" style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "50%", height: "150px", paddingTop: "15%" }}>
              <Button onClick={() => quitLobby()}>{dictionary.challenge_with_friends.quit}</Button>
            </div>
          </div>
        </div>
      </>
    );
}
