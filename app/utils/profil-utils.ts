import axios from "axios"
import $ from "jquery"
import { serverURL } from '../utils/globals'
import React, { useState, useEffect } from 'react'
import getTokenContract from '../utils/tokens'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

export const { account } = useWeb3React()
export const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545') // TESTNET
export const [username, setUsername] = useState('')
export const [email, setEmail] = useState('')

export var wallet = [
  {
    symbol: 'ETH',
    balance: 10,
    startTilt: 0,
    endTilt: 0,
    tilt: 0,
    contract: getTokenContract('ETH', true),
  },
  {
    symbol: 'BNB',
    balance: 20,
    startTilt: 0,
    endTilt: 0,
    tilt: 0,
    contract: getTokenContract('BNB', true),
  },
  {
    symbol: 'BTCB',
    balance: 30,
    startTilt: 0,
    endTilt: 0,
    tilt: 0,
    contract: getTokenContract('BTCB', true),
  },
  {
    symbol: 'ZLDKC',
    balance: 100,
    startTilt: 0,
    endTilt: 0,
    tilt: 0,
    contract: getTokenContract('ZLDKC', true),
  },
]

useEffect(() => {
  if (account !== '' && account !== undefined && account !== null) {
    axios
      .get(`${serverURL}:8080/user/profile`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setUsername(res.data.username)
          setEmail(res.data.email)
        }
      })
  }
}, [account])

export function saveModal() {
    var newUsername = $('#new-username-input').val()
    var newEmail = $('#new-email-input').val()
    axios
      .patch(
        `${serverURL}:8080/user/profile`,
        {
          username: newUsername,
          email: newEmail,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        },
    )
      .then((res) => {
        if (res.status === 200) {
          setUsername(newUsername)
          setEmail(newEmail)
          closeModal(newUsername, newEmail)
        }
    })
}

export function closeModal(newUsername: string = '', newEmail: string = '') {
    if (newUsername !== '') $('#new-username-input').val(newUsername)
    else $('#new-username-input').val(username)
    if (newEmail !== '') $('#new-email-input').val(newEmail)
    else $('#new-email-input').val(email)
    $('#modal-change-infos').hide()
}

export function openModal() {
  $('#modal-change-infos').show()
}