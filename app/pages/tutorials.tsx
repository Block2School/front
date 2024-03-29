import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import styles from '../styles/tutorials-beta.module.css'
import axios from 'axios';
import TutorialCard from '../components/tutorials-beta/tutorialsCard';
import { serverURL } from '../utils/globals'
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageSwitcher/language';

const TutorialBeta = () => {
  const [filteredTutorials, setFilteredTutorials] = useState([])
  const [allTutorials, setAllTutorials] = useState([])
  const [allCategories, setAllCategories] = useState([])
  const [allPaths, setAllPaths] = useState([])
  const [searchTitle, setSearchTitle] = useState("")
  const { dictionary } = useContext(LanguageContext);

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
    })
  }, []);

  const filterTutorialsLanguage = (filter: any) => {
    const Filt = allTutorials.filter((tutorial: any) => tutorial.category == filter)
    setFilteredTutorials(Filt)
    setSearchTitle(filter)
  }

  const filterTutorialsPath = (path: any) => {
    const Path = allTutorials.filter((tutorial: any) => tutorial.path == path)
    setFilteredTutorials(Path)
    setSearchTitle(path)
  }

  const filterTutorialsWithSearch = (search: any) => {
    const Search = allTutorials.filter((tutorial: any) => tutorial.title.toLowerCase().includes(search.toLowerCase()))
    setFilteredTutorials(Search)
    setSearchTitle(search)
  }

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.sidebar}>
          <h2 className={styles.sidebar_title}>{dictionary.tutorials.languages}</h2>
          <ul>
            {allCategories.map((language: any, index) => (
              <li key={index} onClick={() => filterTutorialsLanguage(language.name)} className={styles.category_choices}>{language.name}</li>
            ))}
          </ul>
          <h2 className={styles.sidebar_title}>{dictionary.tutorials.paths}</h2>
          <ul>
            {allPaths.map((paths: any, index) => (
              <li key={index} onClick={() => filterTutorialsPath(paths.path)} className={styles.category_choices}>{paths.path}</li>
            ))}
          </ul>
        </div>
      <div className={styles.forum_page}>
      <div className={styles.search_posts}>
        <form>
          <input type="text" placeholder={dictionary.tutorials.placeholder_search} onChange={(e) => filterTutorialsWithSearch(e.target.value)} />
          <button type="submit">{dictionary.tutorials.search}</button>
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
      </div>
    </div>
      <Footer />
    </>
  );
}

export default TutorialBeta