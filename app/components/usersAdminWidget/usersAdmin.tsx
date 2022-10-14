import UserCard from "./userCard"
import BannedUserCard from "./bannedUserCard"


export default function userAdmin() {


  const userList = [
    {
      id:1,
      name:"Nayeon",
      isBanned:false
    },
    {
      id:2,
      name:"Jeongyeon",
      isBanned:false
    },
    {
      id:3,
      name:"Momo",
      isBanned:false
    },
    {
      id:4,
      name:"Sana",
      isBanned:false
    },
    {
      id:5,
      name:"Jihyo",
      isBanned:false
    },
    {
      id:6,
      name:"Mina",
      isBanned:false
    },
    {
      id:7,
      name:"Dahyun",
      isBanned:false
    },
    {
      id:8,
      name:"Chaeyoung",
      isBanned:false
    },
    {
      id:9,
      name:"Tzuyu",
      isBanned:false
    },
    {
      id:1,
      name:"Nayeon",
      isBanned:false
    },
    {
      id:2,
      name:"Jeongyeon",
      isBanned:false
    },
    {
      id:3,
      name:"Momo",
      isBanned:false
    },
    {
      id:4,
      name:"Sana",
      isBanned:false
    },
    {
      id:5,
      name:"Jihyo",
      isBanned:false
    },
    {
      id:6,
      name:"Mina",
      isBanned:false
    },
    {
      id:7,
      name:"Dahyun",
      isBanned:false
    },
    {
      id:8,
      name:"Chaeyoung",
      isBanned:false
    },
    {
      id:9,
      name:"Tzuyu",
      isBanned:false
    },
  ]

  const bannedList = [
    {
      id:1,
      name:"Nayeon",
      isBanned:true
    },
    {
      id:2,
      name:"Jeongyeon",
      isBanned:true
    },
    {
      id:3,
      name:"Momo",
      isBanned:true
    },
    {
      id:4,
      name:"Sana",
      isBanned:true
    },
    {
      id:5,
      name:"Jihyo",
      isBanned:true
    },
    {
      id:6,
      name:"Mina",
      isBanned:true
    },
    {
      id:7,
      name:"Dahyun",
      isBanned:true
    },
    {
      id:8,
      name:"Chaeyoung",
      isBanned:true
    },
    {
      id:9,
      name:"Tzuyu",
      isBanned:true
    },
  ]

  const personList = userList.map(person => <UserCard person={person}/>);
  const bannedPersonList = bannedList.map(person => <BannedUserCard person={person}/>);
  
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