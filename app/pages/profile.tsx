import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import getTokenContract from '../utils/tokens'
import { getFullDisplayBalance } from '../utils/format'
import $ from 'jquery'

export default function Profile() {
  const {
    account,
    library,
    chainId,
    activate,
    deactivate,
    active,
  } = useWeb3React()
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545') // TESTNET

  const [address, setAddress] = useState('')
  const [balanceBNB, setBalanceBNB] = useState('')
  const [balanceETH, setBalanceETH] = useState(0)
  const [username, setUsername] = useState('goub le bg')
  const [email, setEmail] = useState('goub@dogo.com')
  const wallet = [
    { symbol: 'ETH', balance: 80, startTilt: 0, endTilt: 0, tilt: 0 },
    { symbol: 'BNB', balance: 90, startTilt: 0, endTilt: 0, tilt: 0 },
    { symbol: 'ZLDKC', balance: 100, startTilt: 0, endTilt: 0, tilt: 0 },
    { symbol: 'USD', balance: 280, startTilt: 0, endTilt: 0, tilt: 0 },
    { symbol: 'EUR', balance: 10, startTilt: 0, endTilt: 0, tilt: 0 },
  ]

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      web3.eth.getBalance(account ? account : '').then((res: any) => {
        console.log('HERE => ')
        console.log(res)
        setBalanceBNB(web3.utils.fromWei(res, 'ether'))
      })
    }
  }, [account])

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      let contract: Contract | undefined = getTokenContract('ETH', true)
      if (contract) {
        contract.methods
          .balanceOf(account)
          .call()
          .then((res: any) => {
            // console.log('ETH BALANCE : ', res)
            // console.log('ETH : getFullDisplayBalance : ', getFullDisplayBalance(res, 8, 2),)
            let r: number = parseFloat(web3.utils.fromWei(res, 'ether'))
            // console.log('CustomTokenBalance r: ', r)
            setBalanceETH(r)
          })
      }
    }
  }, [account])

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      var cssDonut = ''
      var colors = ['red', 'blue', 'yellow', 'green']
      var totalBalance = 0
      var totalTilt = 0

      wallet.sort((a, b) =>
        b.balance > a.balance ? 1 : a.balance > b.balance ? -1 : 0,
      )
      var top4Wallet = wallet.slice(0, 4)
      for (var i = 0; i < wallet.length; i++) {
        totalBalance += wallet[i].balance
      }
      for (var i = 0; i < top4Wallet.length; i++) {
        top4Wallet[i].startTilt = totalTilt
        top4Wallet[i].tilt =
          ((top4Wallet[i].balance * 100) / totalBalance) * 3.6
        top4Wallet[i].endTilt = top4Wallet[i].startTilt + top4Wallet[i].tilt
        totalTilt += top4Wallet[i].tilt
      }
      $('#profile-balance-container').empty()
      for (var i = 0; i < top4Wallet.length; i++) {
        cssDonut +=
          colors[i] +
          ' ' +
          top4Wallet[i].startTilt +
          'deg ' +
          top4Wallet[i].endTilt +
          'deg, '
        $('#profile-balance-container').append(
          '<div style="display: flex; width: 100%; height: 50px; align-items: center;justify-content: center;">' +
            '<div style="display: flex;justify-content: end;width: 30%;">' +
            '<div style="width: 30px; height: 30px; display: flex; border-radius: 50%; border: 1px solid white; background-color: ' +
            colors[i] +
            '">' +
            '</div>' +
            '</div>' +
            '<div style="display: flex;justify-content: start;width: 70%;">' +
            '<span style="color: white;font-size: 150%;font-weight: bold;display: flex;margin-left: 10px;align-items: center;justify-content: center;height: 100%;font-family: "Segoe UI", sans-serif;">' +
            top4Wallet[i].balance +
            ' ' +
            top4Wallet[i].symbol +
            '</span>' +
            '</div>' +
            '</div>',
        )
      }
      $('#profile-balance-container').append(
        '<div style="display: flex; width: 100%; height: 50px; align-items: center;justify-content: center;">' +
          '<div style="display: flex;justify-content: end;width: 30%;">' +
          '<div style="width: 30px; height: 30px; display: flex; border-radius: 50%; border: 1px solid white; background-color: purple">' +
          '</div>' +
          '</div>' +
          '<div style="display: flex;justify-content: start;width: 70%;">' +
          '<span style="color: white;font-size: 150%;font-weight: bold;display: flex;margin-left: 10px;align-items: center;justify-content: center;height: 100%;font-family: "Segoe UI", sans-serif;">Other</span>' +
          '</div>' +
          '</div>',
      )
      cssDonut +=
        'purple ' + top4Wallet[top4Wallet.length - 1].endTilt + 'deg 360deg'
      $('#profile-donut').css('background', 'conic-gradient(' + cssDonut + ')')
    }
  }, [])

  return (
    <>
      <Navbar />
      {account !== '' && account !== undefined && account !== null ? (
        <div id="profile-container">
          <div id="profile-header">
            <span>Your address : {account}</span>
          </div>
          <div id="profile-body">
            <div id="profile-body-left">
              <div id="profile-infos">
                <span className="profile-infos-text">{username}</span>
                <span className="profile-infos-text">{email}</span>
              </div>
              <div id="profile-infos-button">
                <button onClick={() => {}}>Change infos</button>
              </div>
            </div>
            <div id="profile-body-separator"></div>
            <div id="profile-body-right">
              <div id="profile-donut-container">
                <div id="profile-donut">
                  <div id="profile-donut-hole"></div>
                </div>
              </div>
              <div id="profile-balance-container"></div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
      <Footer />
    </>
  )
}
