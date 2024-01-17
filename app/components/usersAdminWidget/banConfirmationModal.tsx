import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { serverURL } from '../../utils/globals'


export default function banModal({person, closeModal}:any) {

  const [token, setToken] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
  }, []);

  const handleClick = () => {
    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/ban`,
      data: {
        uuid: person.uuid,
        reason: banReason
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    })
    window.location.reload();
  }

  return (
    <div className='background-modal'>
      <div className='modal-container'>
        <div className='modal-title'>
          <h1>Are you sure you want to ban {person.uuid}?</h1>
        </div>
        <div className='modal-body'>
          <h4>Please put a reason:</h4>
          <input type="text" name="banReason" value={banReason} id="" onChange={e => {setBanReason(e.target.value)}}/>
        </div>
        <div className='modal-footer'>
          <button className='ban-button' onClick={handleClick}>Ban</button>
          <button className='unban-button' onClick={() => closeModal(false)} >Cancel</button>
        </div>
      </div>
    </div>
  )
}