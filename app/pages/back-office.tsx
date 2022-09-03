import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { serverURL } from '../utils/globals'

const BackOffice = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token === null) {
      setIsAdmin(false)
      return
    }

    // axios.get(`${serverURL}:8080/isAdmin`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }).then(res => {
    //   console.log('ZEBI TA GUEULE')
    //   if (res.data.data && res.data.data.isAdmin === true) {
    //     setIsAdmin(true);
    //   }
    // }).catch(err => {
    //   setIsAdmin(false);
    //   console.log('ERR: ', err);
    // });
    setIsAdmin(true)
  }, [])

  return isAdmin === false ? (
    <>
      <h1>Sorry, this page is for admin only</h1>
    </>
  ) : (
    <>
      <h1>BackOffice</h1>
    </>
  )
}

export default BackOffice
