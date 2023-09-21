import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';
import tutorialCard from '../components/tutorials-beta/tutorialsCard'
import LastTutorialsCard from '../components/tutorials-beta/lastTutorialsCard';
import styles from '../styles/tutorials-beta.module.css'


import axios from 'axios';
import ForumPost from '../components/forum/forumPost';
import TutorialCard from '../components/tutorials-beta/tutorialsCard';

const tutorials = [
  {
    name: "Learning Javascript 1",
    language: "Javascript",
    completed: true,
    category: "Beginner",
    shortDetails: "Begin your journey of learning JS!",
    details:"In this tutorial you will discover the Javascript programming language, learn it's basic concepts and start the long but wonderful journey of web-programming. Do you think you can do it? We believe you can!",
  },
  {
    name: "Learning Javascript 2",
    language: "Javascript",
    completed: true,
    shortDetails: "Having fun with JS? Try these next level tricks!",
    details:"After learning the basic and fundemantal syntax of Javascript, come try this tutorial to see it's neat tricks and understand why it is one of the most commonly used programming langugaes in the wolrd",
    category: "Intermediate"
  },
  {
    name: "Learning Javascript 3",
    language: "Javascript",
    completed: false,
    shortDetails: "Become a master of Javascript, and know all it's secrets",
    details:"This tutorial is for those who want to call themselves experts at Javascript. This tutorial shows what you need to know to truly be able to use Javascript in a professional setting, and understand it's complex features",
    category: "Expert"
  },
  {
    name: "Learning Solidity 1",
    language: "Solidity",
    completed: false,
    shortDetails: "Enter the world of web3 coding with Solidity!",
    details:"Start your journey of web3 programming here. Here, you will learn the basic paragigms of Solidity, it's syntax and fundemental concepts. It is advised that you have a bit of programming and coding experiece before trying this tutorial as it will make thinks simpler ",
    category: "Beginner"
  },
  {
    name: "Learning Solidity 2",
    language: "Solidity",
    completed: false,
    shortDetails: "Master the base concepts of Solidity",
    details:"Let's diving into the differences between using Solidity compated to more 'traditional' programming languages as we start to discover the complexities of programming in web3. Don't be afraid though, different doesn't mean harder, we know you an do it!",
    category: "Intermediate"
  },
  {
    name: "Learning Solidity 3",
    language: "Solidity",
    completed: false,
    shortDetails: "Start writing smart contracts and deep programs with Solidity",
    details:"Start writing real world ready smart contracts and connecting to blockchains. With this tutorial you will be able to start building a considerable portfolio in web3 programming.",
    category: "Expert"
  },
  {
    name: "Learning Python 1",
    language: "Python",
    completed: true,
    shortDetails: "Welcome to one of the most popular porgramming languages!",
    details:"One of the most popular programming languages due to it's versatility. Want to do web, video-games, or data? Python can help you achieve all of those. So get started now and learn this must-know programming language",
    category: "Beginner"
  },
  {
    name: "Learning Python 2",
    language: "Python",
    completed: false,
    shortDetails: "Come try these basic and must-know tricks of python!",
    details:"One of the reasons of Python's popularity is it's inuitive and easy to use language. Come discover all the cool and advanced tricks you can do in python and use them to start solving complex problems. Start building considerable algothims and scripts that you can actually use in your daily lives!",
    category: "Intermediate"
  },
]

const TutorialBeta = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [filteredTutorials, setFilteredTutorials] = useState(tutorials)


  const languages = ['Javascript', 'Solidity', 'Python'];
  const categories = ['Beginner', 'Intermediate', 'Expert'];

  const filterTutorialsLanguage = (filter: any) => {
    const Filt = tutorials.filter((tutorial) => tutorial.language == filter)
    setFilteredTutorials(Filt)
    console.log(filteredTutorials)
  }

  const filterTutorialsCategory = (filter: any) => {
    const Filt = tutorials.filter((tutorial) => tutorial.category == filter)
    setFilteredTutorials(Filt)
    console.log(filteredTutorials)
  }

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
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebar_title}>Languages</h2>
          <ul>
            {languages.map((language) => (
              <li onClick={() => filterTutorialsLanguage(language)} className={styles.category_choices}>{language}</li>
            ))}
          </ul>
          <h2 className={styles.sidebar_title}>Category</h2>
          <ul>
            {categories.map((category) => (
              <li onClick={() => filterTutorialsCategory(category)} className={styles.category_choices}>{category}</li>
            ))}
          </ul>
        </div>
      <div className={styles.forum_page}>
      <div className={styles.search_posts}>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className={styles.latest_posts}> 
        <ul className={styles.tuto_list}>
          {
            filteredTutorials.map((tutos) => (
                <TutorialCard tutorial={tutos}></TutorialCard>
              ))
          }
        </ul>
      </div>
      </div>
      <div className={styles.sidebar}>
          <h2 className={styles.sidebar_title_right}>Last Tutorial</h2>
          <LastTutorialsCard title="Learning Javascript 2" category="Javascript"></LastTutorialsCard>
        </div>
    </div>
      <Footer />
    </>
  );
}

export default TutorialBeta