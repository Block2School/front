import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar/navbar";
import { Text, SimpleGrid, Box, useClipboard } from "@chakra-ui/react";
import { serverURL, webSocketURL } from "../../../utils/globals";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";

export default function ChallengesTemp() {
  const router = useRouter();
  const [room, setRoom] = useState<{
      master: string,
      occupants: [{
        userId: string,
        username: string,
      }],
      maxTime: number,
      limitUser: number
  }>({ master: '', occupants: [{userId:'', username:''}], maxTime: 10, limitUser: 4 });
  const { roomID, uuid } = router.query;
  const [time, setTime] = useState({minutes: 5, seconds: 0});
  const [ws, setWs] = useState<WebSocket | null>(null);
  let check : boolean = false;
  const [roomJoined, setRoomJoined] = useState(false);
  const [player, setPlayer] = useState<{username: string, uuid:string, points: string}>({username:"", uuid:"", points:""})
  
  
  function getRoomLink () {
    let rawLink = (window != undefined) ? window?.location?.href : '';
    console.log('rawLink: ', rawLink);
    const lastPos = rawLink?.lastIndexOf('/');
    let link = rawLink?.substring(0, lastPos);
    console.log('link: ', link);
    return link;
  }
  const { onCopy, value, hasCopied} = useClipboard(`http://localhost:3000/challengesTemp/` + roomID);

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
          router.push("/challenge")
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
    if (roomJoined === false) {
      joinRoom();
      setRoomJoined(true);
      fetchRoom();
    }
  }, [room])

  function fetchProfile() {
    axios
      .get(`${serverURL}:8080/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setPlayer({username: res.data.username, uuid: res.data.uuid, points: res.data.points})
        }
      })
  }

  async function fetchRoom() {
    let res = await axios.get(`${serverURL}:8080/challenges/getRoomById/` + roomID, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
    console.log('fetchROOM[RES.DATA]: ', res.data);
    setRoom(res.data);
  }

  async function joinRoom() {

    var socket = new WebSocket(`ws://${webSocketURL}:8080/joinRoom/` + roomID + `/` + uuid)
    setWs(socket);

    if (socket) {
      socket.onopen = () => {
        console.log("connected");
      };

      socket.onmessage = (e) => {
        parseMessage(e.data);
      };
    }
  }

  function parseMessage(message: string) {
    const data = JSON.parse(message);
    switch (data.type) {
      case "new user joined":
        console.log('newUserJoined: Room: ', room);
        console.log('newUserJoined: ', data.message);
        let _myRoom: any = {};
        Object.assign(_myRoom, room);
        _myRoom.occupants.push(data.message);
        setRoom(_myRoom);
        break;
      case "room info":
        console.log('roomInfo: ', data.message);
        console.log("temps => " + data.message.remainingTime)
        if (data.message?.remainingTime == undefined) break;
        setTime({minutes: Math.floor(data.message.remainingTime / 60), seconds: data.message.remainingTime % 60 })

        let myRoom: any = {};
        console.log('room: ', room);
        Object.assign(myRoom, room);
        Object.assign(myRoom.occupants, data.message.occupants);
        setRoom(myRoom);
        break;
      case "joinRoom":
        console.log("joined room: ", data.message);
        // update room (only update occupants)
        let myRoomData: any = {};
        Object.assign(myRoomData, room);
        Object.assign(myRoomData.occupants, data.message.occupants);
        setRoom(myRoomData);
        break;
      case "userLeft":
        console.log('userLeft: ', data.message);
        let _myRoom2: any = {};
        Object.assign(_myRoom2, room);
        _myRoom2.occupants = data.message.occupants;
        setRoom(_myRoom2);
        break;
      case "leaveRoom":
        console.log("left room", data.message);
        // NOTHING TO DO.
        break;
      case "startGame":
        console.log("starting game");
        // TODO: start game
        break;
      case "endGame":
        console.log("ending game");
        // TODO: end game
        break;
      default:
        console.log("unknown message");
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
    if (res.data === true) {
      console.log("Left room");
      // fetchRooms();
    } else {
      console.log("Error leaving room");
    }
  }

  async function deleteRoom() {
    let res = await axios.post(`${serverURL}:8080/challenges/deleteRoom/` + roomID, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
    if (res.data === true) {
      console.log("room delete")
      // fetchRooms();
    } else {
      console.log("Error deleting room");
    }
    fetchRoom()
  }

  function inviteFriends() {
    // TO BE DETERMINED
  }

  async function quitLobby() {
    fetchRoom();
    if (ws) {
      console.log("ZEUBI")
      console.log(ws.readyState);
      console.log("ZEUBI2")
      if (room.master == uuid && ws.readyState === WebSocket.OPEN) {
          console.log("MASTERRRRRR")
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

  async function destroyLobby() {
    await leaveLobby();
    await deleteRoom();
    console.log("DESTROY")
    console.log(room)
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("leaveRoom")
      ws.send("deleteRoom")
      ws.close();
    }
  }

  return (
    <>
      <div id="screen" style={{height:"100vh"}}>
        <Navbar/>
        <div id="content" style={{flexDirection:"column",justifyContent:"center", alignItems:"center",
             height:"calc(100vh - 95px)", width:"100%"}}>
          <Button onClick={onCopy}>Copier le lien</Button>
          <div id="time" style={{color:"#ffe6c4" , fontSize:"85px", justifyContent:"center", alignItems:"center", height:"175px"}}>
            {String(time.minutes).padStart(2, '0')}:{String(time.seconds).padStart(2, '0')}
          </div>
          <div id="users" style={{height:"50%", width:"50%"}}>
            <SimpleGrid columns={2} gap={6} height={"100%"}>
              <Box bg='tomato'>{room.occupants.at(0)?.username}</Box>
              <Box bg='tomato'>{room.occupants.at(1)?.username}</Box>  {/* Réfléchir implémentation Ami dans Box */}
              <Box bg='tomato'>{room.occupants.at(2)?.username}</Box>
              <Box bg='tomato'>{room.occupants.at(3)?.username}</Box>
            </SimpleGrid>
          </div>
          <div id="options" style={{display:"flex", justifyContent:"space-evenly", alignItems:"center",width:"50%" ,height:"150px"}}>
            <Button onClick={() => quitLobby()}>Quitter</Button>
          </div>
        </div>
      </div>
    </>
  );
}
