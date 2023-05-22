import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import styles from '../styles/forum.module.css'
import forumPost from '../components/forum/forumPost'


import axios from 'axios';
import ForumPost from '../components/forum/forumPost';

const Forum = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const categories = ['Learning Python', 'Smart Contracts', 'Crypto Bros', 'NFTS and tricks']; // define categories


  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token === null) {
      setIsAdmin(false)
      return
    }

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
    // (isAdmin === false) ?
    //   <>
    //     <h1>Sorry, this page is for admin only</h1>
    //   </>
    //   :
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}> {/* add class name to sidebar */}
          <h2 className={styles.sidebar_title}>B2S Forum</h2>
          <ul>
            {categories.map((category) => (
              <li className={styles.category_choices}>{category}</li>
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
          <li>
            <ForumPost title="Iterating in a loop" subreddit="Learning Python" author="hackermans99" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="What is the use of a blockchain?" subreddit="Thoughts" author="ElonCusk" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="Intergrating a smart contract" subreddit="Smart Contracts" author="Bill Gay" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="Losing all my money in a week" subreddit="Crypto Bros" author="BingChilling" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="Can I make an NFT with feet pics?" subreddit="Tips and tricks" author="MikeHunt" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="I'm a webdeveloper, when should I stop?" subreddit="Suicidal thoughts" author="sadface99" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
          <li>
          <ForumPost title="Hacking my ex's netlfix password" subreddit="Poor bois" author="Jose Fernan" timestamp="10/10/1995" score="20000"></ForumPost>
          </li>
        </ul>
      </div>
    </div>
    </div>
      <Footer />
    </>

  );
}

export default Forum