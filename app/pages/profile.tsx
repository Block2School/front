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
import EraseTwoFAModal from '../components/modals/2FA/EraseTwoFAModal'
import ReactivateTwoFAModal from '../components/modals/2FA/ReactivateTwoFAModal'
import { serverURL } from '../utils/globals'
import { wallet } from '../utils/profil-utils'
import UserNFTView from '../components/profile/userNFT'
import { sendGAEvent } from '../utils/utils'
import { Text, Input, Link, Heading, Center, Button, Switch, HStack, useDisclosure, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton } from "@chakra-ui/react"
import {AiFillYoutube, AiFillTwitterCircle, AiFillGithub} from 'react-icons/ai'
import QRCode from 'qrcode'
import Style from '../styles/profile-beta.module.css'
import NftCard from '../components/profile-beta/nftCard'
import LastTutorialsCard from '../components/tutorials-beta/lastTutorialsCard';

import { LanguageContext } from '../components/LanguageSwitcher/language'

export default function Profile() {

  const { dictionary } = React.useContext(LanguageContext);
  const label = "2FA Authentificator"
  const { account } = useWeb3React()
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545') // TESTNET
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [twitter, setTwitter] = useState('https://www.twitter.com')
  const [youtube, setYoutube] = useState('https://www.youtube.com')
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

  const [isOpen2, setIsOpen2] = useState(false)
  const [isOpen3, setIsOpen3] = useState(false)
  const [state2FASwitch, setState2FASwitch] = useState(false)

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

  const handleLinkClick = (link:any) => {
    // window.location.href = link;
    // open in new tab
    window.open(link, '_blank');
  }

  useEffect(() => {
    if (account !== '' && account !== undefined && account !== null) {
      fetchProfile()
      // fetchSucces()
      fetchFriends()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  function fetchProfile() {
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
          // populateFriendList(res.data.data) // TODO: delete
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
    QRCode.toDataURL(qr).then(setSrcImg);
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

  const openSecondModal = () => {
    setIsOpen2(true);
  };

  const closeSecondModal = () => {
    setIsOpen2(false);
  };

  const openThirdModal = () => {
    setIsOpen3(true);
  };

  const closeThirdModal = () => {
    setIsOpen3(false);
  };

  useEffect (() => {
    axios.get(`${serverURL}:8080/user/authenticator`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    }).then( res => {
      if(res.data.has_authenticator === true)
        setState2FASwitch(true)
      else
        setState2FASwitch(false)
    })
  })

  async function handle2FA(event: { target: { checked: any } }) {
    if (event.target.checked === true) {
      setup2FA()
    } else {
      openSecondModal()
    }
  }

  async function handleReactivate() {
    openThirdModal()
  }

  async function setup2FA () {
    let res = await axios.post(`${serverURL}:8080/user/authenticator/qrcode`, {
      wordlist:null,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => {
      if (res.status === 200) {
        setWordList(res.data.wordlist)
        generate(res.data.qr)
        onOpen()
      }
    }).catch(res => {
      handleReactivate()
    })
  }

  async function remove2FA(words :string) {
    let res = await axios.delete(`${serverURL}:8080/user/authenticator/qrcode`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      },
      data: {wordlist:words}
    })
  }

  async function check2FA() {
    let res = await axios.get(`${serverURL}:8080/user/authenticator`,{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    })
    if (res.data.has_authenticator === true) {
      return true
    } else {
      return false
    }
  }

  async function handleState2FA() {
    let check = await check2FA() 
    if (check === true) {
      setState2FASwitch(true)
    } else {
      setState2FASwitch(false)
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
        <div>
          <HStack spacing='24px'>
            <Text fontSize="2xl" color="white">{label}</Text>
            <Switch size='lg' isChecked={state2FASwitch} onChange={handle2FA}/>
          </HStack>
        </div>
        <div className={Style.profile_icons_container}>
          <div onClick={() => handleLinkClick(youtube)}>
            <AiFillYoutube className={Style.profile_icon} size={30}></AiFillYoutube>
          </div>
          <div onClick={() => handleLinkClick(twitter)}>
            <AiFillTwitterCircle className={Style.profile_icon} size={30}></AiFillTwitterCircle>
            </div>
            <div onClick={() => handleLinkClick("https://www.github.com")}>
            <AiFillGithub className={Style.profile_icon} size={30}></AiFillGithub>
            </div>
        </div>
        <div className={Style.profile_body}>
            <div className={Style.profile_data}>
                <h3>{dictionary.profile_page.profile_stats}</h3>
                <Text>
                  {percentageProgress}% {dictionary.profile_page.tutorials_completed}
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
                            <h4>{dictionary.profile_page.progress}</h4>
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
                                         <h4>{dictionary.profile_page.last_tutorial}</h4>
                                         <LastTutorialsCard title={lastTutorial.title} category="" id={lastTutorial.tutorial_id} ></LastTutorialsCard>
                                     </div>
                      :null}
                </div>
                <Button color= "#343434" backgroundColor="#ffe6c4"
                      onClick={() => {
                        sendGAEvent('Profile', 'button_click', 'Open Modal Change Infos')
                        openModal()
                      }}
                >{dictionary.profile_page.change_infos}</Button>
                 <div style={{ height: "50%", top: "26%" }} id="modal-change-infos">
                <div id="modal-change-infos-header">
                  <Text>{dictionary.profile_page.change_infos}</Text>
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Close Modal Change Infos')
                      closeModalChangeInfos()
                    }}
                  >
                    {dictionary.profile_page.close}
                  </Button>
                </div>
                <div style={{ height: '90%' }} id="modal-change-infos-body">
                  <div className="modal-change-infos-row">
                    <Text color="white" fontSize="2xl">{dictionary.profile_page.username}</Text>
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
                  >{dictionary.profile_page.apply_changes}</Button>
                </div>
              </div>
            </div>
            <div className={Style.profile_friends}>
                <h3>{dictionary.profile_page.friend_list}</h3>
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
                >{dictionary.profile_page.add_friend}</Button>
                 <div id="modal-search-friends">
                <div id="modal-search-friends-header">
                  <Text>{dictionary.profile_page.search_friend}</Text>
                  {/* <Button color="#343434" backgroundColor="#ffe6c4" onClick={() => methodDoesNotExist()}>Break the world</Button>; */}
                  <Button color="#343434" backgroundColor="#ffe6c4"
                    onClick={() => {
                      sendGAEvent('Profile', 'button_click', 'Close Modal Search Friends')
                      closeModalSearchFriends()
                    }}
                  >
                    {dictionary.profile_page.close}
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
                  >{dictionary.profile_page.search}</Button>
                </div>
              </div>
            </div>
        </div>
        <UserNFTView />
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
      <EraseTwoFAModal isOpen={isOpen2} closeModal={closeSecondModal} erase2FA={remove2FA} handleState2FA={handleState2FA} ></EraseTwoFAModal>
      <ReactivateTwoFAModal isOpen={isOpen3} closeModal={closeThirdModal} generate={generate} handleState2FA={handleState2FA} ></ReactivateTwoFAModal>
    </>
  )
}

