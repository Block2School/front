import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { serverURL } from '../../utils/globals'


export default function userCard({person}:any) {

  const [token, setToken] = useState('');
  const [banReason, setBanReason] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    // ToDo: get markdown list
  }, []);

    const handleClick = () => {
      console.log("UnBanning user: " + person.name);
      console.log("Unbanning user ID: " +person.id);
      axios({
        method: 'POST',
        url: `${serverURL}:8080/admin/unban`,
        data: {
          uuid: person.id,
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
    <div className='user-card-div'>
        <h1>{person.name}</h1>
        <button onClick={handleClick} className='unban-button'>Unban User</button>
    </div>
  )
}