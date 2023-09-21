import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import styles from '../styles/forum.module.css'


import axios from 'axios';
import ForumPost from '../components/forum/forumPost';

const posts = [
  {
    title: "Iterating in a loop",
    subreddit:'Learning Python',
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:'Matisse Page',
    timestamp:'09/09/23',
    comments: [
      {
        text:"This is super easy!",
        commentAuthor:"Epitechkid",
      },
      {
        text:"Not sure why I doesn't work with me :(",
        commentAuthor:"selfTaughtboi",
      },
      {
        text:"Thank you for this!",
        commentAuthor:"Nicedude69",
      },
    ],
    score:'200'
  },
  {
    title: "Lists, and lists and lists",
    subreddit:'Learning Python',
    text:"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:'Lorenzo Manoeuvre',
    timestamp:'09/09/23',
    comments: [
      {
        text:"Always the best!",
        commentAuthor:"loverlover",
      },
    ],
    score:'12'
  },
  {
    title: "Best way to start learning Solidity",
    subreddit:'Smart Contracts',
    text: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:'Cyril Grosjean',
    timestamp:'09/09/23',
    comments: [
      {
        text:"How long does it take to do this?",
        commentAuthor:"Letopop",
      },
      {
        text:"Thank you so much!",
        commentAuthor:"Simpboi",
      },
    ],
    score:'10'
  },
  {
    title: "Practical uses of smart contracts",
    subreddit:'Smart Contracts',
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:'Jose Fernan',
    timestamp:'09/09/2023',
    comments: [
      {
        text:"Really the best writer out here",
        commentAuthor:"migofan",
      },
    ],
    score:'200'
  },
  {
    title: "Can we trust smart contracts",
    subreddit:'Smart Contracts',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author:'Gabriel Knies',
    timestamp:'09/09/2023',
    comments: [
      {
        text:"New Jeans are the best",
        commentAuthor:"Bunnyfan",
      },
      {
        text:"No GIDLE is the best",
        commentAuthor:"iheartmiyeon",
      },
      {
        text:"IVE is the best",
        commentAuthor:"AFTERLIKE",
      },
    ],
    score:'90'
  },
  {
    title: "Is this still going on?",
    subreddit:'Crypto Bros',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author:'Mr Roze',
    timestamp:'09/09/23',
    comments: [
    ],
    score:'23'
  },
  {
    title: "My first coin from B2S!",
    subreddit:'NFTS and tricks',
    text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    author:'Jeff Bezos',
    timestamp:'09/09/23',
    comments: [
      {
        text:"I hate you",
        commentAuthor:"Muskyboi",
      },
      {
        text:"I love you",
        commentAuthor:"Zuckthecuck",
      },
      {
        text:"Omelette du fromage",
        commentAuthor:"ArnaultyBoi",
      },
    ],
    score:'100'
  },
  {
    title: "How to create your own NFT",
    subreddit:'NFTS and tricks',
    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:'Jose Fernan',
    timestamp:'09/09/23',
    comments: [
      {
        text:"I followed this and I am now a millionaire",
        commentAuthor:"HustleMan69",
      },
    ],
    score:'50'
  },
]

const Forum = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const categories = ['Learning Python', 'Smart Contracts', 'Crypto Bros', 'NFTS and tricks']; // define categories
  const [currentList, setCurrentList] = useState(posts)

  const filterBySubreddit = (filter: any) => {
    const Filt = posts.filter((post) => post.subreddit == filter)
    setCurrentList(Filt)
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
          <h2 className={styles.sidebar_title}>B2S Forum</h2>
          <ul>
            {categories.map((category) => (
              <li onClick={() => filterBySubreddit(category)} className={styles.category_choices}>{category}</li>
              ))}
          </ul>
        </div>
      <div className={styles.forum_page}> {/* add class name to container */}
      <div className={styles.search_posts}> {/* add class name to section */}
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={styles.latest_posts}> {/* add class name to section */}
        <h2 className={styles.type_of_post}>Hottest Posts</h2>
        <ul>
          {
            currentList.map((post) => (
                <ForumPost post={post}></ForumPost>
              ))
          }
        </ul>
      </div>
    </div>
    <div className={styles.sidebar}> {/* add class name to sidebar */}
          <h2 className={styles.sidebar_title}>Profile</h2>
          <ul>
            <li className={styles.category_choices}>Write thread</li>
          </ul>
        </div>
    </div>
      <Footer />
    </>

  );
}

export default Forum