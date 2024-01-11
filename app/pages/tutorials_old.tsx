import axios from "axios";
import { serverURL } from "../utils/globals";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { useDisclosure } from "@chakra-ui/react";
import TutorialCategoryModal from "../components/modals/category/tutorialCategoryModal";
import LevelTutorial from "../components/tutorialsList/levelDifficulty";
import SuggestionTutorial from "../components/tutorialsList/levelSuggestion";
import LoadingScreen from "../components/loading/loadingScreen";

export default function Tutorials() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<[{ name: string, image: string, description: string }]>([{ name: '', image: '', description: '' }]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${serverURL}:8080/tuto/category/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setCategories(res.data.data);
      console.log('categories1: ', res.data.data);
      setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
    })
  }, []);

  const showCategoryTutorialsModal = (category: string) => {
    setCurrentCategory(category)
    onOpen()
  }

  return (
    (isLoading === true) ?
      <>
        <LoadingScreen showError={false}/>
      </> :
      <>
        <Navbar/>
        <div id='content'>
          <div id='wrapper-flex'>
            <SuggestionTutorial categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal}/>
            <LevelTutorial name="LEVEL EASY" categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal}/>
            <LevelTutorial name="LEVEL MEDIUM" categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal}/>
            <LevelTutorial name="LEVEL HARD" categories={categories} showCategoryTutorialsModal={showCategoryTutorialsModal}/>
          </div>
        </div>
        <Footer/>
        <TutorialCategoryModal isOpen={isOpen} closeModal={onClose} category={currentCategory} />
      </>
  )
}
