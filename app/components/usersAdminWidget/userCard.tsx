import React from 'react'
import { useState } from 'react';
import BanModal from './banConfirmationModal';

export default function userCard({person}:any) {

    const [openModal, setOpenModal] = useState(false);
    const handleClick = () => {
        setOpenModal(true);
      }

  return (
    <div>
      <div className='user-card-div'>
        <h1>{person.uuid}</h1>
        <button onClick={handleClick} className='ban-button'>Ban User</button>
      </div>
      {openModal && <BanModal person={person} closeModal={setOpenModal}/>}
    </div>
  )
}
