import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import BanModal from './modConfirmationModal';

export default function userCard({person}:any) {

    const [openModal, setOpenModal] = useState(false);
    const handleClick = () => {
        setOpenModal(true);
      }

  return (
    <div>
      <div className='user-card-div'>
          <h1>{person.name}</h1>
          <button onClick={handleClick} className='unban-button'>Mod User</button>
      </div>
      {openModal && <BanModal person={person} closeModal={setOpenModal}/>}
    </div>
  )
}
