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
import { sendGAEvent } from '../utils/utils'
import { Text, Input, Link, Heading, Center, Button } from "@chakra-ui/react"

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
          $("#profile-tuto-completed").text(`You have completed ${res.data.data[0].total_completions} tutorials`)
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
      $('#friend-search-list').hide()
    }, delay)
  }

  function openModal() {
    $('#modal-change-infos').css('display', 'flex')
    $('#profile-blur').show()
  }

  function searchFriend() {
    $('#modal-search-friends').show()
    $('#search-friend-input').val("")
    $('#friend-search-list').empty()
    $('#profile-blur').show()
  }

  function searchForFriends() {
    var username = $('#search-friend-input').val()
    if (username === '') {
      $('#friend-search-list').hide()
      $("#friend-request-message").text("Please enter a username")
      $('#friend-request-message').css('color', 'red')
      $("#friend-request-message").show()
      return
    }
    axios.get(`${serverURL}:8080/user/search`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      params: {
        user: username,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.data.datas.length === 0) {
            $("#friend-request-message").text("User not found")
            $('#friend-request-message').css('color', 'red')
            $("#friend-request-message").show()
          } else {
            $('#friend-search-list').show()
            $('#friend-request-message').hide()
            populateFriendSeatchList(res.data.datas)
          }
        } else if (res.status === 201) {
          $("#friend-request-message").text("User not found")
          $('#friend-request-message').css('color', 'red')
          $("#friend-request-message").show()
        }
      })

    function populateFriendSeatchList(friendsList: any) {
      var container = $('#friend-search-list')
      container.empty()

      for (let index = 0; index < friendsList.length; index++) {
        var item = '<div id="friend-search-item-' + index + '" class="friend-search-item">' +
          '<div class="friend-search-item-middle">' +
          '<span style="font-size: 16px; font-weight: 600; margin: 0px;">' + friendsList[index].username + '</span>' +
          '</div>' +
          '<div class="friend-search-item-right">' +
          '<img src="/plus.png" style="width: 20px; height: 20px; border-radius: 50%; filter: invert(1); cursor: pointer"></img>' +
          '</div>' +
          '</div>'
        container.append(item)
        $('#friend-search-item-' + index + ' .friend-search-item-right').click(() => {
          sendFriendRequestToUser(friendsList[index].uuid)
        })
      }
    }
    function sendFriendRequestToUser(uuid: string) {
      axios.post(`${serverURL}:8080/user/friends`, {
          friend_uuid: uuid,
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
                <Center h="150px">
                  <Text fontSize="4xl" color="white">Your wallet address: {account}</Text>
                </Center>
              </div>
              <div id="profile-body">
                <div id="profile-body-left">
                  <div id="profile-infos">
                    <Text style={{ color: "greenyellow" }} id="profile-tuto-completed" className="profile-infos-text">You have completed 0 tutorials</Text>
                    <Text className="profile-infos-label">Points :</Text>
                    <Text className="profile-infos-text">{points}</Text>
                    <Text className="profile-infos-label">Username :</Text>
                    <Text className="profile-infos-text">{username}</Text>
                    <Text className="profile-infos-label">Email :</Text>
                    <Text className="profile-infos-text">{email}</Text>
                    <Text className="profile-infos-label">Twitter :</Text>
                    <Text className="profile-infos-text">{twitter}</Text>
                    <Text className="profile-infos-label">Youtube :</Text>
                    <Text className="profile-infos-text">{youtube}</Text>
                  </div>
                  <div className="profile-open-modal">
                    <Button color= "#343434" backgroundColor="#ffe6c4"
                      onClick={() => {
                        sendGAEvent('Profile', 'button_click', 'Open Modal Change Infos')
                        openModal()
                      }}
                    >Change infos</Button>
                  </div>
                </div>
                <div id="profile-body-separator"></div>
                <div id="profile-body-right">
                  <div id="friends-container">
                    <div id="friends-header">
                      <Text style={{
                        color: 'white',
                        fontSize: '150%',
                        fontWeight: 'bold',
                        display: 'flex',
                        alignContent: 'center',
                      }}>Friends</Text>
                    </div>
                    <div id="friends-list"></div>
                  </div>
                  <div className="profile-open-modal">
                    <Button
                      style={{ color: "#343434", backgroundColor:"#ffe6c4" }}
                      onClick={() => {
                        sendGAEvent('Profile', 'button_click', 'Search Friend')
                        searchFriend()
                      }}
                    >Add Friend</Button>
                  </div>
                </div>
              </div>
              <div style={{ height: "50%", top: "26%" }} id="modal-change-infos">
                <div id="modal-change-infos-header">
                  <Text>Change infos</Text>
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Close Modal Change Infos')
                      closeModalChangeInfos()
                    }}
                  >
                    Close
                  </Button>
                </div>
                <div style={{ height: '90%' }} id="modal-change-infos-body">
                  <div className="modal-change-infos-row">
                    <Text color="white" fontSize="2xl">Username</Text>
                    <Input id="new-username-input" defaultValue={username} width="400px"></Input>
                  </div>
                  <div className="modal-change-infos-row">
                    <Text color="white" fontSize="2xl">Email</Text>
                    <Input id="new-email-input" defaultValue={email} width="400px"></Input>
                  </div>
                  <div className="modal-change-infos-row">
                    <Text color="white" fontSize="2xl">Twitter</Text>
                    <Input id="new-twitter-input" defaultValue={twitter} width="400px"></Input>
                  </div>
                  <div className="modal-change-infos-row">
                    <Text color="white" fontSize="2xl">Youtube</Text>
                    <Input id="new-youtube-input" defaultValue={youtube} width="400px"></Input>
                  </div>
                </div>
                <div id="modal-change-infos-footer">
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Save Modal Change Infos')
                      saveModal()
                    }}
                  >Apply changes</Button>
                </div>
              </div>
              <div id="modal-search-friends">
                <div id="modal-search-friends-header">
                  <Text>Search friends</Text>
                  {/* <Button color="#343434" backgroundColor="#ffe6c4" onClick={() => methodDoesNotExist()}>Break the world</Button>; */}
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Close Modal Search Friends')
                      closeModalSearchFriends()
                    }}
                  >
                    Close
                  </Button>
                </div>
                <div id="modal-search-friends-body">
                  <div id="modal-search-friends-searchbar">
                    <input style={{ width: '75%' }} id="search-friend-input" placeholder="Enter your friend username"></input>
                  </div>
                  <span id="friend-request-message"></span>
                  <div id="friend-search-list" style={{display: 'none'}}></div>
                </div>
                <div id="modal-search-friends-footer">
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Send Friend Request')
                      searchForFriends()
                    }}
                  >Search</Button>
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
          <Text color="white" fontSize="3xl">You must be connected to access profile page </Text>
        </div>
      )}
      <Footer />
    </>
  )
}

