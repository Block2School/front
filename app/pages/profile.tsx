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
import TwoFAModal from '../components/modals/2FA/TwoFAModal'
import { serverURL } from '../utils/globals'
import { wallet } from '../utils/profil-utils'
import UserNFTView from '../components/profile/userNFT'
import { sendGAEvent } from '../utils/utils'
import { Text, Input, Link, Heading, Center, Button, Switch, HStack, useDisclosure, Box, space } from "@chakra-ui/react"
import {AiFillYoutube, AiFillTwitterCircle, AiFillGithub} from 'react-icons/ai'
import QRCode from 'qrcode'
import Style from '../styles/profile-beta.module.css'
import NftCard from '../components/profile-beta/nftCard'
import LastTutorialsCard from '../components/tutorials-beta/lastTutorialsCard';


export default function Profile() {

  const label = "2FA Authentificator"
  const { account } = useWeb3React()
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545') // TESTNET
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [twitter, setTwitter] = useState('')
  const [youtube, setYoutube] = useState('')
  const [points, setPoints] = useState('')
  const [srcImg, setSrcImg] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [word_list, setWordList] = useState('')
  const [wallet, setWallet] = useState('')
  const [lastTutorial, setLastTutorial] = useState<any>({})
  const [nbCompletedTutorials, setNbCompletedTutorials] = useState<any>('0')
  const [totalNbTutorials, setTotalNbTutorials] = useState<any>('100')
  const [percentageProgress, setPercentageProgress] = useState<number>(0)
  const [friendList, setFriendList] = useState<[{
    friend_uuid: string,
    status: string,
    username: string
  }]>()

  const test_data = {
    test_username: "MigoMax",
    test_email: "jose.fernan@epitech.eu",
    test_twitter:"twitter.com",
    test_youtube:"youtube.com",
    test_points:"6969",
    test_srcImg:"",
    test_account:"Show Wallet",
    percentage: 60,
    wallet: "wlkfzieflqsiosflizlIG",
    "last_completed_tutorials": [
      {
        "title": "Last tuto",
        "tutorial_id": "1"
      }
    ]
  }

  const test_friends = [
    'Gabriel Knies',
    'Matisse Page',
    'Cyril Grosjean',
    'Lorenzo Manoeuvre',
    'Lucas Dudot',
    'Elon Musk',
    'Gabriel Knies',
    'Matisse Page',
    'Cyril Grosjean',
    'Lorenzo Manoeuvre',
    'Lucas Dudot',
    'Elon Musk',
  ]

  const test_friendList = [
    {
      "username": "Migo",
      "status": "Pending"
    },
    {
      "username": "Gabriel",
      "status": "Accepted"
    },
    {
      "username": "Lorenzo",
      "status": "Pending"
    },
    {
      "username": "Migo",
      "status": "Pending"
    },
    {
      "username": "Migo",
      "status": "Pending"
    },
  ]

  const testNFT = [
    {
      name: "Learning Javascript 1",
      language: "Javascript",
      completed: true,
      category: "Beginner",
      shortDetails: "Begin your journey of learning JS!",
      details:"In this tutorial you will discover the Javascript programming language, learn it's basic concepts and start the long but wonderful journey of web-programming. Do you think you can do it? We believe you can!",
      price:"300$",
      date_acquired:"01/01/2024"
    },
    {
      name: "Learning Javascript 2",
      language: "Javascript",
      completed: true,
      shortDetails: "Having fun with JS? Try these next level tricks!",
      details:"After learning the basic and fundemantal syntax of Javascript, come try this tutorial to see it's neat tricks and understand why it is one of the most commonly used programming langugaes in the wolrd",
      category: "Intermediate",
      price:"300$",
      date_acquired:"01/01/2024"
    },
    {
      name: "Learning Javascript 3",
      language: "Javascript",
      completed: false,
      shortDetails: "Become a master of Javascript, and know all it's secrets",
      details:"This tutorial is for those who want to call themselves experts at Javascript. This tutorial shows what you need to know to truly be able to use Javascript in a professional setting, and understand it's complex features",
      category: "Expert",
      price:"300$",
      date_acquired:"01/01/2024"
    },
  ]

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      console.log("LORENZO")
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
    console.log('[fetchProfile]: token === ', sessionStorage.getItem('token'))
    axios
      .get(`${serverURL}:8080/user/v2/profile?n=1`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log('[fetchProfile]: res.data === ', res.data)
          setUsername(res.data.username)
          setEmail(res.data.email)
          setTwitter(res.data.twitter)
          setYoutube(res.data.youtube)
          setPoints(res.data.points)
          setWallet(res.data.wallet)
          if (res.data.last_completed_tutorials.length > 0)
            setLastTutorial(res.data.last_completed_tutorials[0])
          setNbCompletedTutorials(res.data.nb_completed_tutorials)
          setTotalNbTutorials(res.data.total_nb_tutorials)
          let _percentage = ((res.data.nb_completed_tutorials * 100) / res.data.total_nb_tutorials)
          console.log('[fetchProfile]: _percentage === ', _percentage)
          setPercentageProgress(_percentage)
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
          console.log('[fetchFriends]: res.data === ', res.data);
          populateFriendList(res.data.data) // TODO: delete
          setFriendList(res.data.data)
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

  function addFriendAsked(uuid: string) {
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

  function generate(qr: string) {
    console.log(qr)
    QRCode.toDataURL(qr).then(setSrcImg);
  }

  async function setup2FA() {
    
    let res = await axios.post(`${serverURL}:8080/user/authenticator/qrcode`, {
      wordlist:null,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    })
    console.log(res.data.qr)
    console.log(res.data.wordlist)
    setWordList(res.data.wordlist)
    generate(res.data.qr)
    onOpen()
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
      <div className={Style.main_container}>
        <div className={Style.central_profile_container}>
            <div className={Style.central_username_div}>
                <span>{username}</span>
            </div>
            <div className={Style.central_pic_div}>
                <div className={Style.profile_pic}>
                </div>
            </div>
            <div className={Style.central_wallet_div}>
                <span>{wallet}</span>
            </div>
        </div>
        <div className={Style.profile_icons_container}>
            <AiFillYoutube className={Style.profile_icon} size={30}></AiFillYoutube>
            <AiFillTwitterCircle className={Style.profile_icon} size={30}></AiFillTwitterCircle>
            <AiFillGithub className={Style.profile_icon} size={30}></AiFillGithub>
        </div>
        <div className={Style.profile_body}>
            <div className={Style.profile_data}>
                <h3>Profile stats</h3>
                <Text>
                  {percentageProgress}% of tutorials completed
                </Text>
                <div className={Style.profile_data_body}>
                    <div className={Style.profile_data_body_stats}>
                        <div className={Style.profile_data_body_stats_points}>
                            <h4>Points</h4>
                                <div className={Style.profile_data_body_stats_points_value_div}>
                                    <span>{points}</span>
                                </div>
                        </div>
                        <div className={Style.profile_data_body_stats_points}>
                            <h4>Progress</h4>
                                <div className={Style.profile_data_body_stats_points_value_div}>
                                    <div className={Style.percentage_bar}>
                                        <div className={Style.filler} style={{ width: `${percentageProgress}%` }}></div>
                                        {/* <span>{`${percentageProgress}%`}</span> */}
                                        <Text
                                          color={"white"}
                                        >
                                          {`${percentageProgress}%`}
                                        </Text>
                                    </div>
                                </div>
                        </div>
                    </div>
                    {lastTutorial.title? 
                                         <div className={Style.profile_data_body_last_tuto}>
                                         <h4>Last Tutorial</h4>
                                         <LastTutorialsCard title={lastTutorial.title} category="" id={lastTutorial.tutorial_id} ></LastTutorialsCard>
                                     </div>
                      :null}
                </div>
                <Button color= "#343434" backgroundColor="#ffe6c4"
                      onClick={() => {
                        sendGAEvent('Profile', 'button_click', 'Open Modal Change Infos')
                        openModal()
                      }}
                >Change infos</Button>
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
            </div>
            <div className={Style.profile_friends}>
                <h3>Friends List</h3>
                <div className={Style.profile_friends_body}>
                    {
                    friendList?.map((friend, index) => (
                        <div key={index} className={Style.friend_row}>
                          <Text overflow={"clip"}>{friend.username + " "}</Text>
                          {friend.status === "pending" ? <span>{"(pending)"}</span>: null}
                          {friend.status === "asking" ? <span>{"(requested)"}</span>: null}
                          {(friend.status === "pending" || friend.status === "friend") ?
                          <div className={Style.button_remove} onClick={() => deleteFriend(friend.friend_uuid)}>
                            <Text
                              color="red"
                              fontWeight={"bold"}
                            >-</Text>
                          </div> : null}
                          {friend.status === "asking" ?
                          <div className={Style.button_accept} onClick={() => addFriendAsked(friend.friend_uuid)}>
                            <Text
                              fontWeight={"bold"}
                              color="green"
                            >+</Text>
                          </div> : null}
                        </div> 
                      ))
                    }
                </div>
                <Button
                      style={{ color: "#343434", backgroundColor:"#ffe6c4" }}
                      onClick={() => {
                        sendGAEvent('Profile', 'button_click', 'Search Friend')
                        searchFriend()
                      }}
                >Add Friend</Button>
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
        {/* <div className={Style.nft_container}>
            <h3>My NFTS</h3>
            <ul className={Style.nft_container_body}>
                {
                testNFT.map((tutos, index) => (
                    <NftCard key={index} tutorial={tutos}></NftCard>
                    // <h1>test</h1>
                ))
                }
            </ul>
        </div> */}
      </div>
      <Footer />
      <TwoFAModal isOpen={isOpen} closeModal={onClose} qr_code={srcImg} wordlist={word_list}></TwoFAModal>
    </>
  )
}

