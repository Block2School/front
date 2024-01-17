import React from 'react'
import axios from 'axios'
import {Text} from '@chakra-ui/react'
import { serverURL } from '../../utils/globals'
import { useState, useEffect } from 'react'


export default function adminDashboard() {

    const [allTutorials, setAllTutorials] = useState("")
    const [token, setToken] = useState('')
    const [nbTutorials, setNbTutorials] = useState<Number>(55)
    const [nbTutorialsPast, setNbTutorialsPast] = useState<Number>(30)
    const [nbArticles, setNbArticles] = useState<Number>(4)
    const [nbArticlesPast, setNbArticlesPast] = useState<Number>(0)
    const [nbUsers, setNbUsers] = useState<Number>(10)
    const [nbUsersPast, setNbUsersPast] = useState<Number>(8)
    const [nbForumPosts, setNbForumPosts] = useState<Number>(4)
    const [nbForumPostsPast, setNbForumPostsPast] = useState<Number>(10)


    

    useEffect(()=> {
        axios.get(`${serverURL}:8080/tuto/v2/all`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }).then(res => {
            setNbTutorials(res.data.data.length);
            console.log('NB TUTORIALS = ', res.data.data.length)
          })
    })


    useEffect(()=> {
        axios.get(`${serverURL}:8080/article/all`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }).then(res => {
            setNbArticles(res.data.data.length);
            console.log('NB ARTICLES = ', res.data.data.length)
          })
    })

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
        }).then((res:any) => {
            setNbUsers(res.data.data.length)
        }
        );
    })

    useEffect(()=> {
        axios.get(`${serverURL}:8080/forum/all`, {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            }
          }).then(res => {
            setNbForumPosts(res.data.data.length);
            console.log('NB FORUM POSTS = ', res.data.data.length)
          })
    })



    return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <Text className="usersAdmin-title"> Administrator Dashboard </Text>
        </div>
        <div className='admin-dashboard-grid'>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title"> Total Users </Text>
                </div>
                <div className="admin-widget-information">
                    <div className="admin-widget-information-1">
                        <Text className='admin-widget-information-1-text'>{nbUsers}</Text>
                    </div>
                    <div className="admin-widget-information-2">
                        <Text className='admin-widget-information-2-title'>Difference from last month</Text>
                        {nbUsers - nbUsersPast > 0 ?  
                        <Text className='admin-widget-information-2-text' color={'green'}>+{nbUsers - nbUsersPast}</Text> 
                        : 
                        <Text className='admin-widget-information-2-text' color={'red'}>{nbUsers - nbUsersPast}</Text>}
                    </div>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title"> Total Tutorials </Text>
                </div>
                <div className="admin-widget-information">
                    <div className="admin-widget-information-1">
                        <Text className='admin-widget-information-1-text'>{nbTutorials}</Text>
                    </div>
                    <div className="admin-widget-information-2">
                        <Text className='admin-widget-information-2-title'>Difference from last month</Text>
                        {nbTutorials - nbTutorialsPast > 0 ?  
                        <Text className='admin-widget-information-2-text' color={'green'}>+{nbTutorials - nbTutorialsPast}</Text> 
                        : 
                        <Text className='admin-widget-information-2-text' color={'red'}>{nbTutorials - nbTutorialsPast}</Text>}
                    </div>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title"> Total Articles </Text>
                </div>
                <div className="admin-widget-information">
                    <div className="admin-widget-information-1">
                        <Text className='admin-widget-information-1-text'>{nbArticles}</Text>
                    </div>
                    <div className="admin-widget-information-2">
                        <Text className='admin-widget-information-2-title'>Difference from last month</Text>
                        {nbArticles - nbArticlesPast > 0 ?  
                        <Text className='admin-widget-information-2-text' color={'green'}>+{nbArticles - nbArticlesPast}</Text> 
                        : 
                        <Text className='admin-widget-information-2-text' color={'red'}>{nbArticles - nbArticlesPast}</Text>}
                    </div>
                </div>
            </div>
            <div className='admin-widget'>
                <div className="usersAdmin-title-div">
                    <Text className="usersAdmin-title"> Total Forum Posts </Text>
                </div>
                <div className="admin-widget-information">
                    <div className="admin-widget-information-1">
                        <Text className='admin-widget-information-1-text'>{nbForumPosts}</Text>
                    </div>
                    <div className="admin-widget-information-2">
                        <Text className='admin-widget-information-2-title'>Difference from last month</Text>
                        {nbForumPosts - nbForumPostsPast > 0 ?  
                        <Text className='admin-widget-information-2-text' color={'green'}>+{nbForumPosts - nbForumPostsPast}</Text> 
                        : 
                        <Text className='admin-widget-information-2-text' color={'red'}>{nbForumPosts - nbForumPostsPast}</Text>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
