import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import styles from '../styles/forum.module.css'
import { serverURL } from "../utils/globals";

import axios from 'axios';
import ForumPost from '../components/forum/forumPost';
import { LanguageContext } from '../components/LanguageSwitcher/language';
import { BiX } from 'react-icons/bi';

const Forum = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const categories = ['Learning Python', 'Smart Contracts', 'Crypto Bros', 'NFTS and tricks']; // define categories
  const [currentList, setCurrentList] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [isConnected, setIsConnected] = useState(false)
  const [createModel, setCreateModel] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: ''
  });
  const { dictionary } = useContext(LanguageContext)

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token) {
      setIsConnected(true)
    }
  })

  const filterBySubreddit = (filter: any) => {
    const Filt = allPosts.filter((post: any) => post.category == filter)
    setCurrentList(Filt)
  }

  const backHome = () => {
    setCurrentList(allPosts)
  }

  const handleInputChange = (even: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    axios.get(`${serverURL}:8080/forum/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setAllPosts(res.data.data)
      setCurrentList(res.data.data);
    })
  }, []);


  const handleSubmitPost = (event: any) => {
    const token: string | null = sessionStorage.getItem('token')
    if (formData.title === '' || formData.category === '' || formData.description === '') {
      alert('Please fill all the fields')
      return
    }
    axios({
      method: 'POST',
      url: `${serverURL}:8080/forum/create`,
      data: {
        "title": formData.title,
        "description": formData.description,
        "category": formData.category
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
    });
  }


  useEffect(() => {
    setIsAdmin(true)
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <div onClick={() => backHome()} className={styles.backhome_div}>
            <h2 className={styles.sidebar_title}>B2S Forum</h2>
          </div>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => filterBySubreddit(category)} className={styles.category_choices}>{category}</li>
            ))}
          </ul>
        </div>
        <div className={styles.forum_page}> 
          <div className={styles.search_posts}>
          </div>
          <div className={styles.latest_posts}>
            <h2 className={styles.type_of_post}>{dictionary.forum.hottest_posts}</h2>
            <ul>
              {
                currentList.map((post, index) => (
                  <ForumPost key={index} post={post}></ForumPost>
                ))
              }
            </ul>
          </div>
        </div>
        {isConnected ?
          <div className={styles.sidebar}>
            <h2 className={styles.sidebar_title}>{dictionary.forum.profile}</h2>
            <ul>
              <div onClick={() => setCreateModel(!createModel)}>
                <li className={styles.category_choices}>{dictionary.forum.create_post}</li>
              </div>
            </ul>
          </div> :
          null}
        {createModel ?
          <div className={styles.navbar_modal}>
            <div className={styles.navbar_modal_content}>
              <div className={styles.navbar_modal_close} onClick={() => setCreateModel(!createModel)}>
                <BiX
                  size={32}
                  color="white"
                />
              </div>
              <div className={styles.navbar_modal_links}>
                <h1 className={styles.navbar_modal_title}>{dictionary.forum.create_your_post}</h1>
                <form onSubmit={handleSubmitPost}>
                  <label>
                    {dictionary.forum.title}:
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label>
                    {dictionary.forum.category}:
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      {
                        categories.map((category, index) => (
                          <option key={index} value={category}>{category}</option>
                        ))
                      }
                    </select>
                  </label>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </label>
                  <button type="submit">{dictionary.forum.submit}</button>
                </form>
              </div>
            </div>
          </div> : null}

      </div>
      <Footer />
    </>

  );
}

export default Forum