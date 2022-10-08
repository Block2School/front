import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Box,
    Center,
    Grid
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { serverURL } from '../../utils/globals'

const ScoreCard = ({
  language, characters, lines
}: { language:string, characters:number, lines:number}) => {
  return (
    <Box maxW='sm' p={10} borderWidth={1} borderRadius="lg" overflow='hidden'>
      <Text>lang : {language} || char : {characters} || lines : {lines}</Text>
    </Box>
  );
}
  
const ScoreBoardModal = ({
  isOpen, closeModal
}: {isOpen:boolean, closeModal:any}) => {
  const data =  {
    data: [
      {
        uuid:"",
        tutorial_id:0,
        language:"",
        characters:1000000,
        lines:1000000
      }
    ]
  }

  const [score, setScore] = useState(data);
  const [request, setRequest] = useState(true);

  useEffect(() => {
    if (request)
      axios.get(`${serverURL}:8080/tuto/scoreboard/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        }
      }).then(res => {
        setRequest(false);
        setScore(res.data);
        console.log(res.data);
      })
  })

  if (isOpen === false)
    return null;
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
        </ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
          id="close-modal-tuto"
        />
        <ModalBody>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              {
                score.data.map((score, index) => (
                  <ScoreCard key={index} language={score.language} characters={score.characters} lines={score.lines}/>
                ))
              }
            </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScoreBoardModal;