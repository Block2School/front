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

const newTutorials = [
  {
    "id": 1,
    "title": "Hello World",
    "markdownUrl": "https://raw.githubusercontent.com/Block2School/tutorials/master/en/introduction_tutorial.md",
    "category": "JavaScript",
    "answer": "Hello World !\n",
    "startCode": "const helloWorld = () => {\n  //replace this by your code\n};\n\nhelloWorld();\n",
    "shouldBeCheck": 0,
    "enabled": 0,
    "points": 1
  },
  {
    "id": 2,
    "title": "Printing",
    "markdownUrl": "https://raw.githubusercontent.com/Block2School/tutorials/master/en/simple_print_javascript.md",
    "category": "JavaScript",
    "answer": "Simple print\n",
    "startCode": "const print = (/*argument*/) => {\n  // replace this by your code\n};\n\nprint(\"Simple print\");\n",
    "shouldBeCheck": 0,
    "enabled": 0,
    "points": 5
  },
  {
    "id": 3,
    "title": "Mapping and addresses",
    "markdownUrl": "https://raw.githubusercontent.com/Block2School/tutorials/master/en/mapping_address.md",
    "category": "Solidity",
    "answer": "pragma solidity ^0.4.19;\n\ncontract BirdFactory {\n\n event NewBird(uint birdId, string name, uint dna);\n\n uint dnaDigits = 16;\n uint dnaModulus = 10 ** dnaDigits;\n\n struct Bird {\n string name;\n uint dna;\n }\n\n Bird[] public birds;\n\n mapping (uint => address) public birdToOwner;\n mapping (address => uint) ownerBirdCount;\n\n function _createBird(string _name, uint _dna) private {\n uint id = birds.push(Bird(_name, _dna)) - 1;\n NewBird(id, _name, _dna);\n }\n\n function _generateRandomDna(string _str) private view returns (uint) {\n uint rand = uint(keccak256(_str));\n return rand % dnaModulus;\n }\n\n function createRandomBird(string _name) public {\n uint randDna = _generateRandomDna(_name);\n _createBird(_name, randDna);\n }\n\n}",
    "startCode": "pragma solidity ^0.4.19;\n\ncontract BirdFactory {\n\n event NewBird(uint birdId, string name, uint dna);\n\n uint dnaDigits = 16;\n uint dnaModulus = 10 ** dnaDigits;\n\n struct Bird {\n string name;\n uint dna;\n }\n\n Bird[] public birds;\n\n // declare mappings here\n\n function _createBird(string _name, uint _dna) private {\n uint id = birds.push(Bird(_name, _dna)) - 1;\n NewBird(id, _name, _dna);\n }\n\n function _generateRandomDna(string _str) private view returns (uint) {\n uint rand = uint(keccak256(_str));\n return rand % dnaModulus;\n }\n\n function createRandomBird(string _name) public {\n uint randDna = _generateRandomDna(_name);\n _createBird(_name, randDna);\n }\n\n}",
    "shouldBeCheck": 1,
    "enabled": 0,
    "points": 5
  },
]

const TutorialBeta = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [filteredTutorials, setFilteredTutorials] = useState(newTutorials)
  const [allTutorials, setAllTutorials] = useState([])
  const [allCategories, setAllCategories] = useState([])


  const languages = ['JavaScript', 'Solidity', 'Python'];
  // const categories = ['Beginner', 'Intermediate', 'Expert'];

  // useEffect(() => {
  //   axios.get(`${serverURL}:8080/tuto/all`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   }).then(res => {
  //     setAllTutorials(res.data.data);
  //     console.log('categories1: ', res.data.data);
  //     // setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
  //   })
  // }, []);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios.get(`${serverURL}:8080/tuto/category/all`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   }).then(res => {
  //     setAllCategories(res.data.data);
  //     console.log('categories1: ', res.data.data);
  //     setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
  //   })
  // }, []);

  const filterTutorialsLanguage = (filter: any) => {
    const Filt = newTutorials.filter((tutorial) => tutorial.category == filter)
    setFilteredTutorials(Filt)
    console.log(filteredTutorials)
  }

  // const filterTutorialsCategory = (filter: any) => {
  //   const Filt = tutorials.filter((tutorial) => tutorial.category == filter)
  //   setFilteredTutorials(Filt)
  //   console.log(filteredTutorials)
  // }

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
          {/* <h2 className={styles.sidebar_title}>Category</h2>
          <ul>
            {categories.map((category) => (
              <li onClick={() => filterTutorialsCategory(category)} className={styles.category_choices}>{category}</li>
            ))}
          </ul> */}
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