/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React from 'react';
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { serverURL } from "../../utils/globals";
import { useRouter } from "next/router";
import { Button, Link, Text } from "@chakra-ui/react";

export default function setUUID() {

  const [currentUrl, setCurrentUrl] = useState("")
  const router = useRouter()
  const [player, setPlayer] = useState<{username: string, uuid:string, points: string}>({username:"", uuid:"", points:""})
  const [roomState, setRoomState] = useState<'exists' | 'not_found'>('not_found');

  useEffect(() => {
    if (currentUrl !== '') return;
    let _currentUrl = "";
    let roomId = "";
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      _currentUrl = window.location.href;
      roomId = _currentUrl.split('/')[4];
    }
    const onRoomJoining = async () => {
      await fetchRoom(roomId);
      await fetchProfile();
    }
    onRoomJoining();
  }, [currentUrl]);

  useEffect(() => {
    buildPlaceChallengeRoom()
  }, [player.uuid])

  const fetchProfile = async () => {
    let res = await axios.get(`${serverURL}:8080/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      if (res.status === 200) {
        setPlayer({username: res.data.username, uuid: res.data.uuid, points: res.data.points})
      }
  }

  async function fetchRoom(roomId: string) {
    try {
      let res = await axios.get(`${serverURL}:8080/challenges/getRoomById/` + roomId, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      if (res.status !== 200) {
        setRoomState('not_found');
        return;
      } 
      else {
        setRoomState('exists');
        return;
      }
    } catch (error) {
      setRoomState('not_found');
      return;
    }
  }

  function buildPlaceChallengeRoom() {
    if (player.uuid != "" && currentUrl != "" && roomState === 'exists') {
      router.replace(currentUrl + "/" + player.uuid)
    }
  }

  if (roomState === 'not_found')
    return (
      <>
        <div id="screen" style={{ height: "100vh" }}>
          <Navbar />
          <div id="content" style={{
            flexDirection: "column", justifyContent: "center", alignItems: "center",
            height: "calc(100vh - 95px)", width: "100%"
          }}>
            <div id="users" style={{ height: "50%", width: "50%"}}>
              <Text
                color='white'
              >ROOM NOT FOUND</Text>
            </div>
            <Link href="/challenges">
              <Button
                backgroundColor={'#FF9900'}
              >
                <Text
                  color='white'
                >GO BACK</Text>
              </Button>
            </Link>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
      </>
    );
}
