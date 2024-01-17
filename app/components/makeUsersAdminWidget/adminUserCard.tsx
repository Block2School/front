import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Text, Button } from '@chakra-ui/react';
import { serverURL } from '../../utils/globals'

export default function userCard({person}:any) {

  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
  }, []);

  const handleClick = () => {
    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/unmod`,
      data: {
        uuid: person.id,
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
    <div className='user-card-div'>
        <Text>{person.name}</Text>
        <Button onClick={handleClick} className='ban-button'>Unmod User</Button>
    </div>
  )
}