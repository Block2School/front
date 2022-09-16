import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function banModal({person, closeModal}:any) {

  const [banReason, setBanReason] = useState('');

  const handleClick = () => {
    console.log("Banning user: " + person.name);
    console.log("banning user ID: " +person.id);
    axios({
      method: 'post',
      url: "http://www.localhost:8080/ban",
      headers: {}, 
      data: {
        uuid: person.id,
        reason: banReason
      }
    });
    window.location.reload();
  }

  return (
    <div className='background-modal'>
      <div className='modal-container'>
        <div className='modal-title'>
          <h1>Are you sure you want to mod {person.name}?</h1>
        </div>
        <div className='modal-body'>
          <h4>Please put a reason:</h4>
          <input type="text" name="banReason" value={banReason} id="" onChange={e => {setBanReason(e.target.value)}}/>
        </div>
        <div className='modal-footer'>
          <button className='unban-button' onClick={handleClick}>Mod</button>
          <button className='unban-button' onClick={() => closeModal(false)} >Cancel</button>
        </div>
      </div>
    </div>
  )
}