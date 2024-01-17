import UserCard from "./userCard"
import BannedUserCard from "./bannedUserCard"
import { serverURL } from '../../utils/globals'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

export default function UserAdmin() {

  const [token, setToken] = useState('');
  const [allUserList, setAllUserList] = useState([]);
  const [userList, setUserList] = useState([{}]);
  const [bannedUserList, setBannedUserList] = useState([{}]);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    axios({
      method: 'GET',
      url: `${serverURL}:8080/admin/users`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      },
    }).then((res) => {
      let userList_ : Array<{uuid: string, wallet_address: string, is_banned: number}> = [] ;
      let bannedUserList_: Array<{uuid: string, wallet_address: string, is_banned: number}> = [] ;

      res.data.data.forEach((e: any) => {
        if (e.is_banned == 0) {
          userList_.push(e);
        } else {
          bannedUserList_.push(e);
        }
      });
      setUserList(userList_);
      setBannedUserList(bannedUserList_);
    }
    );
  }, []);

  const personList = userList.map(person => <UserCard person={person}/>);
  const bannedPersonList = bannedUserList.map(person => <BannedUserCard person={person}/>);
  
  return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Users</h1>
        </div>
        <div className="user-lists-div">
          <div className="person-list-div">{personList}</div>
          <div className="banned-list-div">{bannedPersonList}</div>
        </div>
    </div>
  )
}