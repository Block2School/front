import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import BanModal from './banConfirmationModal';

export default function userCard({person}:any) {

    const [openModal, setOpenModal] = useState(false);
    const handleClick = () => {
        // console.log("Banning user: " + person.name);
        // console.log("banning user ID: " +person.id);
        // axios({
        //   method: 'post',
        //   url: "http://www.localhost:8080/ban",
        //   headers: {}, 
        //   data: {
        //     uuid: person.id,
        //     reason: "Being a Little bitch"
        //   }
        // });
        // window.location.reload();
        setOpenModal(true);
      }

  return (
    <div>
      <div className='user-card-div'>
          <h1>{person.name}</h1>
          <button onClick={handleClick} className='ban-button'>Ban User</button>
      </div>
      {openModal && <BanModal person={person} closeModal={setOpenModal}/>}
    </div>
  )
}
