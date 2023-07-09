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
import { wallet } from '../utils/profil-utils'
import UserNFTView from '../components/profile/userNFT'

export default function Profile() {

  const { account } = useWeb3React()
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545') // TESTNET
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')
  const [points, setPoints] = useState('')

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      fetchProfile()
      fetchSucces()
      fetchFriends()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  function fetchSucces() {
    axios
      .get(`${serverURL}:8080/tuto/success/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      })
      .then((res) => {
        if (res.status === 200) {
          $("#profile-tuto-completed").text(`You have completed ${res.data.total_completion} tutorials`)
        }
      })
  }

  function fetchProfile() {
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
          setTwitter(res.data.twitter)
          setYoutube(res.data.youtube)
          setPoints(res.data.points)
        }
      })
  }

  function fetchFriends() {
    axios.get(`${serverURL}:8080/user/friends`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((res) => {
        if (res.status === 200) {
          populateFriendList(res.data.data)
        }
      })
  }

  function deleteFriend(uuid: any) {
    axios.delete(`${serverURL}:8080/user/friends`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      data: {
        friend_uuid: uuid
      }
    })
      .then((res) => {
        if (res.status === 200) {
          fetchFriends()
        }
      })
  }

  function populateFriendList(friendsList: any) {
    var listContainer = $('#friends-list')
    listContainer.empty()

    for (let index = 0; index < friendsList.length; index++) {
      let children =
        '<div id=friend-item-' + index + ' class="friend-item">' +
        '<div class="friend-item-left">' +
        '<div class="friend-item-circle">' +
        '<img src="/icon-person.png" style="width: 20px; height: 20px; border-radius: 50%;"></img>' +
        '</div>' +
        '</div>' +
        '<div class="friend-item-middle">' +
        '<span style="font-size: 16px; font-weight: 600; margin: 0px;">' + friendsList[index].username + '</span>' +
        '</div>' +
        '<div class="friend-item-right">' +
        '<img src="/minus.png" style="width: 20px; height: 20px; border-radius: 50%; filter: invert(1); cursor: pointer"></img>' +
        '</div>' +
        '</div>'
      listContainer.append(children)
      if (friendsList[index].status == "friend") {
        $('#friend-item-' + index + ' .friend-item-left .friend-item-circle').css('background-color', 'greenyellow')
        $('#friend-item-' + index + ' .friend-item-left .friend-item-circle').attr('title', 'Friend')
      } else {
        $('#friend-item-' + index + ' .friend-item-left .friend-item-circle').css('background-color', 'orange')
        $('#friend-item-' + index + ' .friend-item-left .friend-item-circle').attr('title', 'Pending')
      }
      $('#friend-item-' + index + ' .friend-item-right').click(() => {
        deleteFriend(friendsList[index].friend_uuid)
      })
    };
  }

  function saveModal() {
    var newUsername = $('#new-username-input').val()
    var newEmail = $('#new-email-input').val()
    var newYoutube = $('#new-youtube-input').val()
    var newTwitter = $('#new-twitter-input').val()
    axios
      .patch(
        `${serverURL}:8080/user/profile`,
        {
          username: newUsername,
          email: newEmail,
          youtube: newYoutube,
          twitter: newTwitter,
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
          setTwitter(newTwitter)
          setYoutube(newYoutube)
          closeModalChangeInfos(newUsername, newEmail, newTwitter, newYoutube)
        }
      })
  }

  function closeModalChangeInfos(newUsername: string = '', newEmail: string = '', newTwitter: string = '', newYoutube: string = '') {
    if (newUsername !== '') $('#new-username-input').val(newUsername)
    else $('#new-username-input').val(username)
    if (newEmail !== '') $('#new-email-input').val(newEmail)
    else $('#new-email-input').val(email)
    if (newTwitter !== '') $('#new-twitter-input').val(newTwitter)
    else $('#new-twitter-input').val(twitter)
    if (newYoutube !== '') $('#new-youtube-input').val(newYoutube)
    else $('#new-youtube-input').val(youtube)
    $('#modal-change-infos').hide()
    $('#profile-blur').hide()
  }

  function closeModalSearchFriends(delay: number = 0) {
    if (delay !== 0) {
      $("#friend-request-message").text("Friend request sent !")
      $('#friend-request-message').css('color', 'greenyellow')
      $("#friend-request-message").show()
    }
    fetchFriends()
    setTimeout(() => {
      $('#search-friend-input').val("")
      $('#modal-search-friends').hide()
      $("#friend-request-message").hide()
      $('#profile-blur').hide()
    }, delay)
  }

  function openModal() {
    $('#modal-change-infos').css('display', 'flex')
    $('#profile-blur').show()
  }

  function searchFriend() {
    $('#modal-search-friends').show()
    $('#profile-blur').show()
  }

  function sendFriendRequest() {
    var friend_uuid = $('#search-friend-input').val()
    if (friend_uuid === '') {
      $("#friend-request-message").text("Please enter a UUID")
      $('#friend-request-message').css('color', 'red')
      $("#friend-request-message").show()
      return
    }
    axios.post(`${serverURL}:8080/user/friends`, {
      friend_uuid: friend_uuid
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
      .then((res) => {
        if (res.status === 200) {
          closeModalSearchFriends(1500)
        } else if (res.status === 201) {
          $("#friend-request-message").text("You are already friend with or pending invite")
          $('#friend-request-message').css('color', 'red')
          $("#friend-request-message").show()
        }
      })
  }

  return (
    <>
      <Navbar />
      {account !== '' && account !== undefined && account !== null ? (
        <>
          <div>
            <div id='profile-blur'></div>
            <div id="profile-container">
              <div id="profile-header">
                <span>Your wallet address: {account}</span>
              </div>
              <div id="profile-body">
                <div id="profile-body-left">
                  <div id="profile-infos">
                    <span style={{ color: "greenyellow" }} id="profile-tuto-completed" className="profile-infos-text">You have completed 0 tutorials</span>
                    <span className="profile-infos-label">Points :</span>
                    <span className="profile-infos-text">{points}</span>
                    <span className="profile-infos-label">Username :</span>
                    <span className="profile-infos-text">{username}</span>
                    <span className="profile-infos-label">Email :</span>
                    <span className="profile-infos-text">{email}</span>
                    <span className="profile-infos-label">Twitter :</span>
                    <span className="profile-infos-text">{twitter}</span>
                    <span className="profile-infos-label">Youtube :</span>
                    <span className="profile-infos-text">{youtube}</span>
                  </div>
                  <div className="profile-open-modal">
                    <button style={{ color: "#ffe6c4" }} onClick={openModal}>Change infos</button>
                  </div>
                </div>
                <div id="profile-body-separator"></div>
                <div id="profile-body-right">
                  <div id="friends-container">
                    <div id="friends-header">
                      <span style={{
                        color: 'white',
                        fontSize: '150%',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignContent: 'center',
                      }}>Friends</span>
                    </div>
                    <div id="friends-list"></div>
                  </div>
                  <div className="profile-open-modal">
                    <button style={{ color: "#ffe6c4" }} onClick={searchFriend}>Add Friend</button>
                  </div>
                </div>
              </div>
              <div style={{ height: "50%", top: "26%" }} id="modal-change-infos">
                <div id="modal-change-infos-header">
                  <span>Change infos</span>
                  <button
                    onClick={() => {
                      closeModalChangeInfos()
                    }}
                  >
                    Close
                  </button>
                </div>
                <div style={{ height: '90%' }} id="modal-change-infos-body">
                  <div className="modal-change-infos-row">
                    <span>Username</span>
                    <input id="new-username-input" defaultValue={username}></input>
                  </div>
                  <div className="modal-change-infos-row">
                    <span>Email</span>
                    <input id="new-email-input" defaultValue={email}></input>
                  </div>
                  <div className="modal-change-infos-row">
                    <span>Twitter</span>
                    <input id="new-twitter-input" defaultValue={twitter}></input>
                  </div>
                  <div className="modal-change-infos-row">
                    <span>Youtube</span>
                    <input id="new-youtube-input" defaultValue={youtube}></input>
                  </div>
                </div>
                <div id="modal-change-infos-footer">
                  <button onClick={saveModal}>Apply changes</button>
                </div>
              </div>
              <div id="modal-search-friends">
                <div id="modal-search-friends-header">
                  <span>Search friends</span>
                  <button
                    onClick={() => {
                      closeModalSearchFriends()
                    }}
                  >
                    Close
                  </button>
                </div>
                <div id="modal-search-friends-body">
                  <div id="modal-search-friends-searchbar">
                    <input style={{ width: '75%' }} id="search-friend-input" placeholder="Enter your friend UUID"></input>
                  </div>
                  <span id="friend-request-message"></span>
                </div>
                <div id="modal-search-friends-footer">
                  <button onClick={sendFriendRequest}>Send request</button>
                </div>
              </div>
            </div>
          </div>
          <UserNFTView />
        </>
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

