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

const ScoreCard = ({
  uuid, characters
}: { uuid: number, characters:number}) => {
  return (
    <Box maxW='sm' p={10} borderWidth={1} borderRadius="lg" overflow='hidden'>
      <Text>{uuid} {characters}</Text>
    </Box>
  );
}
  
const ScoreBoardModal = ({
  isOpen, closeModal
}: {isOpen:boolean, closeModal:any}) => {
  const data =  {
    data: [
      {
        uuid:0,
        tutorial_id:0,
        language:"",
        characters:0,
        lines:0
      }
    ]
  }

  const [score, setScore] = useState(data);

  const [isLoading, setIsLoading] = useState(true);
  
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
          {isLoading ? <Text>Loading...</Text> :
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              {
                score.data.map((score, index) => (
                  // <Text key={index}>{tutorial.title}</Text>
                  <ScoreCard key={index} uuid={score.uuid} characters={score.characters}/>
                ))
              }
            </Grid>
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ScoreBoardModal;