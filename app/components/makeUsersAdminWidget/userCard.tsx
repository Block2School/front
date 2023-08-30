import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import BanModal from './modConfirmationModal';
import { Text, Button } from '@chakra-ui/react';

export default function userCard({person}:any) {

    const [openModal, setOpenModal] = useState(false);
    const handleClick = () => {
        setOpenModal(true);
      }

  return (
    <div>
      <div className='user-card-div'>
          <Text>{person.uuid}</Text>
          <Button onClick={handleClick} className='unban-button'>Mod User</Button>
      </div>
      {openModal && <BanModal person={person} closeModal={setOpenModal}/>}
    </div>
  )
}
