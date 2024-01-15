import React, { useEffect, useState, useContext } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import styles from '../styles/forum.module.css'
import photoJS from '../public/js-ex.jpg'
import { serverURL } from "../utils/globals";
import Link from 'next/link';

import axios from 'axios';
import ForumPost from '../components/forum/forumPost';
import { LanguageContext } from '../components/LanguageSwitcher/language';

// const posts = [
//   {
//     title: "Iterating in a loop",
//     image: '/js-ex.jpg',
//     subreddit:'Learning Python',
//     text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     author:'Matisse Page',
//     timestamp:'09/09/23',
//     comments: [
//       {
//         text:"This is super easy!",
//         commentAuthor:"Epitechkid",
//       },
//       {
//         text:"Not sure why I doesn't work with me :(",
//         commentAuthor:"selfTaughtboi",
//       },
//       {
//         text:"Thank you for this!",
//         commentAuthor:"Nicedude69",
//       },
//     ],
//     score:'200'
//   },
//   {
//     title: "Lists, and lists and lists",
//     image: "",

//     subreddit:'Learning Python',
//     text:"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     author:'Lorenzo Manoeuvre',
//     timestamp:'09/09/23',
//     comments: [
//       {
//         text:"Always the best!",
//         commentAuthor:"loverlover",
//       },
//     ],
//     score:'12'
//   },
//   {
//     title: "Best way to start learning Solidity",
//     image: "/ethereum.png",

//     subreddit:'Smart Contracts',
//     text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     author:'Cyril Grosjean',
//     timestamp:'09/09/23',
//     comments: [
//       {
//         text:"How long does it take to do this?",
//         commentAuthor:"Letopop",
//       },
//       {
//         text:"Thank you so much!",
//         commentAuthor:"Simpboi",
//       },
//     ],
//     score:'10'
//   },
//   {
//     title: "Practical uses of smart contracts",
//     image: "/web3.png",

//     subreddit:'Smart Contracts',
//     text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     author:'Jose Fernan',
//     timestamp:'09/09/2023',
//     comments: [
//       {
//         text:"Really the best writer out here",
//         commentAuthor:"migofan",
//       },
//     ],
//     score:'200'
//   },
//   {
//     title: "Can we trust smart contracts",

//     subreddit:'Smart Contracts',
//     text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     author:'Gabriel Knies',
//     timestamp:'09/09/2023',
//     comments: [
//       {
//         text:"New Jeans are the best",
//         commentAuthor:"Bunnyfan",
//       },
//       {
//         text:"No GIDLE is the best",
//         commentAuthor:"iheartmiyeon",
//       },
//       {
//         text:"IVE is the best",
//         commentAuthor:"AFTERLIKE",
//       },
//     ],
//     score:'90'
//   },
//   {
//     title: "Is this still going on?",
//     image: photoJS,

//     subreddit:'Crypto Bros',
//     text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     author:'Mr Roze',
//     timestamp:'09/09/23',
//     comments: [
//     ],
//     score:'23'
//   },
//   {
//     title: "My first coin from B2S!",
//     image: photoJS,

//     subreddit:'NFTS and tricks',
//     text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
//     author:'Jeff Bezos',
//     timestamp:'09/09/23',
//     comments: [
//       {
//         text:"I hate you",
//         commentAuthor:"Muskyboi",
//       },
//       {
//         text:"I love you",
//         commentAuthor:"Zuckthecuck",
//       },
//       {
//         text:"Omelette du fromage",
//         commentAuthor:"ArnaultyBoi",
//       },
//     ],
//     score:'100'
//   },
//   {
//     title: "How to create your own NFT",
//     image: photoJS,

//     subreddit:'NFTS and tricks',
//     text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
//     author:'Jose Fernan',
//     timestamp:'09/09/23',
//     comments: [
//       {
//         text:"I followed this and I am now a millionaire",
//         commentAuthor:"HustleMan69",
//       },
//     ],
//     score:'50'
//   },
// ]

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
    console.log("filtering by", filter)
    const Filt = allPosts.filter((post: any) => post.category == filter)
    console.log("FILT = ", Filt)
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
      console.log('ALL Posts: ', res.data.data);
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
      console.log('res == ', res);
    });
  }


  useEffect(() => {
    // const token: string | null = sessionStorage.getItem('token')
    // if (token === null) {
    //   setIsAdmin(false)
    //   return
    // }

    // axios.get(`${serverURL}:8080/isAdmin`, {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }).then(res => {
    //   console.log('ZEBI TA GUEULE')
    //   if (res.data.data && res.data.data.isAdmin === true) {
    //     setIsAdmin(true);
    //   }
    // }).catch(err => {
    //   setIsAdmin(false);
    //   console.log('ERR: ', err);
    // });
    setIsAdmin(true)
  }, [])

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}> {/* add class name to sidebar */}
          <div onClick={() => backHome()} className={styles.backhome_div}>
            <h2 className={styles.sidebar_title}>B2S Forum</h2>
          </div>
          <ul>
            {categories.map((category, index) => (
              <li key={index} onClick={() => filterBySubreddit(category)} className={styles.category_choices}>{category}</li>
            ))}
          </ul>
        </div>
        <div className={styles.forum_page}> {/* add class name to container */}
          <div className={styles.search_posts}> {/* add class name to section */}
            {/* <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form> */}
          </div>
          <div className={styles.latest_posts}> {/* add class name to section */}
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
                &times;
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