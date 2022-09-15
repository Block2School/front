import React from 'react'
import axios from 'axios'
import { useState } from 'react';

export default function userCard({person}:any) {
    const [banReason, setBanReason] = useState();

    const handleClick = () => {
        console.log("Banning user: " + person.name);
        console.log("banning user ID: " +person.id);
        axios({
          method: 'post',
          url: "http://www.localhost:8080/unban",
          headers: {}, 
          data: {
            uuid: person.id,
            reason: "Being a Little bitch"
          }
        });
        window.location.reload();
      }

  return (
    <div className='user-card-div'>
        <h1>{person.name}</h1>
        <button onClick={handleClick} className='unban-button'>Unban User</button>
    </div>
  )
}