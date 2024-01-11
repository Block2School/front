import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import styles from '../styles/tutorials-beta.module.css'
import axios from 'axios';
import TutorialCard from '../components/tutorials-beta/tutorialsCard';
import { serverURL } from '../utils/globals'


const testData = [
{
  "title": "Test 1",
  "category": "Javascript",
  "is_completed": false
},
{
  "title": "Test 2",
  "category": "Javascript",
  "is_completed": false
},
{
  "title": "Test 3",
  "category": "Javascript",
},
{
  "title": "Test 4",
  "category": "Javascript",
},
{
  "title": "Test 5",
  "category": "Javascript",
},
{
  "title": "Test 6",
  "category": "Javascript",
  "is_completed": true
},
{
  "title": "Test 7",
  "category": "Javascript",
  "is_completed": true
},

]


const TutorialBeta = () => {
  // const [isAdmin, setIsAdmin] = useState(false)
  const [filteredTutorials, setFilteredTutorials] = useState([])
  const [allTutorials, setAllTutorials] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allPaths, setAllPaths] = useState([])
  const [searchTitle, setSearchTitle] = useState("")

  const paths = ['Web Dev', 'Data Science', 'Blockchain Dev'];
  const test_categories = ['Javascript', 'C++', 'Python'];

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token) {
      axios.get(`${serverURL}:8080/tuto/v2/auth/all`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: 'Bearer ' + sessionStorage.getItem('token')
        }
      }).then(res => {
        setAllTutorials(res.data.data);
        setFilteredTutorials(res.data.data)
        console.log('all TUTO: ', res.data.data);
        console.log("IS ADMIN")
        // setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
      })
    } else {
      axios.get(`${serverURL}:8080/tuto/v2/all`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }).then(res => {
        setAllTutorials(res.data.data);
        setFilteredTutorials(res.data.data)
        console.log('all TUTO: ', res.data.data);
        console.log("NOT ADMIN")
        // setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
      })
    }
  }, []);

  useEffect(() => {
    axios.get(`${serverURL}:8080/tuto/category/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setAllCategories(res.data.data);
      console.log('ALL categories: ', res.data.data);
      // setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
    })
  }, []);

  useEffect(() => {
    axios.get(`${serverURL}:8080/tuto/paths/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setAllPaths(res.data.data);
      console.log('ALL paths: ', res.data.data);
      // setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
    })
  }, []);

  const filterTutorialsLanguage = (filter: any) => {
    const Filt = allTutorials.filter((tutorial: any) => tutorial.category == filter)
    setFilteredTutorials(Filt)
    setSearchTitle(filter)
    console.log(filteredTutorials)
  }

  const filterTutorialsPath = (path: any) => {
    const Path = allTutorials.filter((tutorial: any) => tutorial.path == path)
    setFilteredTutorials(Path)
    setSearchTitle(path)
    console.log(filteredTutorials)
  }

  // useEffect(() => {
  //   const token: string | null = sessionStorage.getItem('token')
  //   if (token === null) {
  //     setIsAdmin(false)
  //     return
  //   }

  //   axios.get(`http://localhost:8080/isAdmin`, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*'
  //     }
  //   }).then(res => {
  //     console.log('ZEBI TA GUEULE')
  //     if (res.data.data && res.data.data.isAdmin === true) {
  //       setIsAdmin(true);
  //     }
  //   }).catch(err => {
  //     setIsAdmin(false);
  //     console.log('ERR: ', err);
  //   });
  //   // setIsAdmin(false)
  // }, [])

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebar_title}>Languages</h2>
          <ul>
            {allCategories.map((language: any, index) => (
              <li key={index} onClick={() => filterTutorialsLanguage(language.name)} className={styles.category_choices}>{language.name}</li>
            ))}
          </ul>
          <h2 className={styles.sidebar_title}>Path</h2>
          <ul>
            {allPaths.map((paths: any, index) => (
              <li key={index} onClick={() => filterTutorialsPath(paths.path)} className={styles.category_choices}>{paths.path}</li>
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
      <div className={styles.category_title_div}>
          <h1 className={styles.category_title}>{searchTitle}</h1>
      </div>
      <div className={styles.latest_posts}> 
        <ul className={styles.tuto_list}>
          {
            filteredTutorials.map((tutos: any, index) => (
                <TutorialCard key={index} tutorial={tutos}></TutorialCard>
              ))
          }
        </ul>
      </div>
      </div>
      <div className={styles.sidebar}>
          {/* <h2 className={styles.sidebar_title_right}>Last Tutorial</h2>
          <LastTutorialsCard title="Learning Javascript 2" category="Javascript"></LastTutorialsCard> */}
      </div>
    </div>
      <Footer />
    </>
  );
}

export default TutorialBeta