/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import React from 'react';
import Navbar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import { serverURL } from "../../utils/globals";
import { useRouter } from "next/router";

export default function setUUID() {

  const [currentUrl, setCurrentUrl] = useState("")
  const router = useRouter()
  const [player, setPlayer] = useState<{username: string, uuid:string, points: string}>({username:"", uuid:"", points:""})

  useEffect(() => {
    console.log(sessionStorage.getItem('token'))
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
      console.log('URL: ', currentUrl);
    }
    const onRoomJoining = async () => {
      await fetchProfile();
    }
    onRoomJoining();
  }, [currentUrl]);


  useEffect(() => {
    console.log("PLAYER", player);
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

  function buildPlaceChallengeRoom() {
    if (player.uuid != "" && currentUrl !="") {
      console.log('BBUILDPLACECHALLENGE', currentUrl + "/" + player.uuid)
      router.replace(currentUrl + "/" + player.uuid)
    }
  }

  return (
    <>
    </>
  );
}
