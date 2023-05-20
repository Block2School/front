import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { serverURL } from '../../utils/globals'


export default function banModal({person, closeModal}:any) {

  const [token, setToken] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    // ToDo: get markdown list
  }, []);

  const handleClick = () => {
    console.log("Banning user: " + person.wallet_address);
    console.log("banning user ID: " +person.uuid);
    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/mod`,
      data: {
        uuid: person.uuid,
        role: 2
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    })
    setTimeout(() => window.location.reload(), 1000);
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