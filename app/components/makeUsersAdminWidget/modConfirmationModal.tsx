import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { serverURL } from '../../utils/globals'
import { Text, Input, Button } from '@chakra-ui/react';


export default function banModal({person, closeModal}:any) {

  const [token, setToken] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
  }, []);

  const handleClick = () => {
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
          <Text>Are you sure you want to mod {person.name}?</Text>
        </div>
        <div className='modal-body'>
          <Text>Please put a reason:</Text>
          <Input type="text" name="banReason" value={banReason} id="" onChange={e => {setBanReason(e.target.value)}}/>
        </div>
        <div className='modal-footer'>
          <Button className='unban-button' onClick={handleClick}>Mod</Button>
          <Button className='unban-button' onClick={() => closeModal(false)} >Cancel</Button>
        </div>
      </div>
    </div>
  )
}