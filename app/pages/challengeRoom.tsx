import axios from "axios";
import react, { useEffect, useState, useContext, useRef } from "react";
import Navbar from "../components/navbar/navbar";
import CustomButton from "../components/button/button";
import { serverURL } from "../utils/globals";
import { LanguageContext } from "../components/LanguageSwitcher/language";
import LoadingScreen from "../components/loading/loadingScreen";
import { formatLanguageToServerLanguage, sendGAEvent } from "../utils/utils";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";


export default function ChallengeRoom() {
  
  const { dictionary } = useContext(LanguageContext);
  const [isLoading, setIsLoading] = useState(true);
  const roomID = getRandomInt();

  function getRandomInt() {
    let min = Math.ceil(1000);
    let max = Math.floor(9999);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    axios.post(`${serverURL}:8080/challenges/createRoom/${roomID}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    }).then(res => {
        console.log("CONSOLE LOG => ", res.data)
        if (res.data == true) {
            console.log("ZEUBI")
        }
    })
    axios.
  }, [])

  return (
    <div id="screen">
        <Navbar />
        {roomID}
    </div>
  );
}