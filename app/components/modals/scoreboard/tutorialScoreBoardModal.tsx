import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { serverURL } from '../../../utils/globals'
import ListScores from './tutorialListScoresModals';

const ScoreBoardModal = ({ isOpen, closeModal, scoreboard}: {isOpen:boolean, closeModal:any, scoreboard:any}) => {
  
  const data =  {
    data: [
      {
        uuid:"",
        tutorial_id:0,
        total_completions:0,
        language:"",
        characters:1000000,
        lines:1000000
      }
    ]
  }

  const [score, setScore] = useState(data);
  const [request, setRequest] = useState(true);

  useEffect(() => {
    axios.get(`${serverURL}:8080/tuto/scoreboard/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      }
    }).then(res => {
      setRequest(false);
    })
  })

  if (isOpen === false)
    return null;
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent bg='#343434'>
        <ModalHeader>
        </ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} id="close-modal-tuto"/>
        <ModalBody>
          <ListScores score={scoreboard}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScoreBoardModal;