import UserCard from "./userCard"
import BannedUserCard from "./adminUserCard"
import { serverURL } from '../../utils/globals'
import { useState, useEffect } from 'react';
import axios from 'axios'


export default function userAdmin() {


  const [token, setToken] = useState('');
  const [allUserList, setAllUserList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [bannedUserList, setBannedUserList] = useState([]);


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

      // console.log(res.data.data)
      res.data.data.forEach(e => {
        userList_.push(e);
      });
      setUserList(userList_);
    }
    );
    // ToDo: get markdown list
  }, []);
  const personList = userList.map(person => <UserCard person={person}/>);
  
  return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Moderators and Users</h1>
        </div>
        <div className="user-lists-div">
          <div className="person-list-div">{personList}</div>
        </div>
    </div>
  )
}