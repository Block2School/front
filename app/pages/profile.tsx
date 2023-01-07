import React, { useState, useEffect } from 'react'
import Footer from '../components/footer/footer'
import Navbar from '../components/navbar/navbar'
import { useWeb3React } from '@web3-react/core'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'
import getTokenContract from '../utils/tokens'
import { getFullDisplayBalance } from '../utils/format'
import $ from 'jquery'
import axios from 'axios'
import SelectWalletModal from '../components/modals/wallets/walletsModal'
import { serverURL } from '../utils/globals'
import {closeModal, openModal, saveModal, account, wallet, username, email} from '../utils/profil-utils'

export default function Profile() {

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
      cssDonut +=
        'purple ' + top4Wallet[top4Wallet.length - 1].endTilt + 'deg 360deg'
      $('#profile-donut').css('background', 'conic-gradient(' + cssDonut + ')')
    }
  }, [account])

  return (
    <>
      <Navbar />
      {account !== '' && account !== undefined && account !== null ? (
        <div id="profile-container">
          <div id="profile-header">
            <span>Your wallet address : {account}</span>
          </div>
          <div id="profile-body">
            <div id="profile-body-left">
              <div id="profile-infos">
                <span className="profile-infos-text">{username}</span>
                <span className="profile-infos-text">{email}</span>
              </div>
              <div id="profile-infos-button">
                <button onClick={openModal}>Change infos</button>
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
          <div id="modal-change-infos">
            <div id="modal-change-infos-header">
              <span>Change infos</span>
              <button
                onClick={() => {
                  closeModal()
                }}
              >
                Close
              </button>
            </div>
            <div id="modal-change-infos-body">
              <div className="modal-change-infos-row">
                <span>Username</span>
                <input id="new-username-input" defaultValue={username}></input>
              </div>
              <div className="modal-change-infos-row">
                <span>Email</span>
                <input id="new-email-input" defaultValue={email}></input>
              </div>
            </div>
            <div id="modal-change-infos-footer">
              <button onClick={saveModal}>Apply changes</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: '81vh',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>You must be connected to access profile page </span>
        </div>
      )}
      <Footer />
    </>
  )
}
