import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { serverURL, webSocketURL } from "../utils/globals";
import { Button } from "react-bootstrap";

export default function ChallengesTemp() {
  const [rooms, setRooms] = useState<any[]>([]);
  const uuid = Math.random().toString(36).substring(7);

  useEffect(() => {
    fetchRooms();
  }, []);

  function fetchRooms() {
    axios
      .get(`${serverURL}:8080/challenges/getAllRooms`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log(res.data.rooms);
        setRooms(res.data.rooms);
      });
  }

  function createRoom(id: Number = 0) {
    axios
      .post(`${serverURL}:8080/challenges/createRoom/1/` + id, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.data.success) {
          fetchRooms();
        } else {
          console.log("Error creating room");
        }
      });
  }

  function joinRoom(id: Number = 0) {
    var ws = new WebSocket(`ws://${webSocketURL}:8080/joinRoom/` + id + "/" + uuid);
    console.log(ws);
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (e) => {
      parseMessage(e.data);
    };
  }

  function parseMessage(message: string) {
    const data = JSON.parse(message);
    switch (data.type) {
      case "joinRoom":
        console.log("joined room");
        break;
      case "leaveRoom":
        console.log("left room");
        break;
      case "startGame":
        console.log("starting game");
        break;
      case "endGame":
        console.log("ending game");
        break;
      default:
        console.log("unknown message");
        break;
    }
  }

  function leaveRoom(uuid:string , idRoom: Number) {
    axios.post(`${serverURL}:8080/challenges/leaveRoom/` + idRoom + '/' + uuid, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("Left room");
          fetchRooms();
        } else {
          console.log("Error leaving room");
        }
      });
  }

  function deleteRoom(idRoom: Number) {
    axios.post(`${serverURL}:8080/challenges/deleteRoom/` + idRoom, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res.data.success) {
          console.log("room delete")
          fetchRooms();
        } else {
          console.log("Error leaving room");
        }
      });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          justifyContent: "space-between",
        }}
      >
        <div className="temp">
          <h1>Rooms</h1>
          <ul>
            {rooms.map((room) => {
              return (
                <li key={room.roomID} onClick={() => {
                  joinRoom(room.roomID)
                }}>
                  <h1>{room.roomID}</h1>
                  <div>{room.occupants}</div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="temp">
          <input id="roomID" type="text" placeholder="Enter Room ID" />
        </div>
        <div className="temp">
          <Button
            onClick={() => {
              const roomID = (
                document.getElementById("roomID") as HTMLInputElement
              ).value;
              createRoom(Number(roomID));
            }}
          >
            Create Room
          </Button>
          <Button
            onClick={() => {
              const roomID = (
                document.getElementById("roomID") as HTMLInputElement
              ).value;
              leaveRoom(uuid, Number(roomID));
            }}
          >
            Leave Room
          </Button>
          <Button
            onClick={() => {
              const roomID = (
                document.getElementById("roomID") as HTMLInputElement
              ).value;
              deleteRoom(Number(roomID));
            }}
          >
            Delete Room
          </Button>
        </div>
      </div>
      <style jsx>{`
        .temp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          flex: 1;
        }
      `}</style>
    </>
  );
}
