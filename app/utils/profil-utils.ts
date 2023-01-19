import axios from "axios"
import $ from "jquery"
import { serverURL } from '../utils/globals'
import React, { useState, useEffect } from 'react'
import getTokenContract from '../utils/tokens'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'

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