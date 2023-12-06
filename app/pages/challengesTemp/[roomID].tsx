import axios from "axios";
import React from 'react';
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { serverURL } from "../../utils/globals";
import { useRouter } from "next/router";

export default function setUUID() {

  const [currentUrl, setCurrentUrl] = useState("")
  const router = useRouter()
  const [player, setPlayer] = useState<{username: string, uuid:string, points: string}>({username:"", uuid:"lorenzo", points:""})

  useEffect(() => {
    console.log(sessionStorage.getItem('token'))
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      console.log('URL: ', currentUrl);
    }
    buildPlaceChallengeRoom()
  }, [currentUrl]);

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
          setPlayer({username: res.data.username, uuid: res.data.uuid, points: res.data.points})
        }
      })
  }
  // href="/challengesTemp/[roomID]/[uuid]" as={`/challengesTemp/${roomID}/${uuid}`}
  function buildPlaceChallengeRoom() {
    if (player.uuid != "" && currentUrl !="") {
      console.log(currentUrl + "/" + player.uuid)
      router.replace(currentUrl + "/" + player.uuid)
    }
  }

  return (
    <>
    </>
  );
}
