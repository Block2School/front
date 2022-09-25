import axios from "axios";
import Image from 'next/image'
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Spinner } from "react-bootstrap";
import { calc, Center, Grid, Text, useDisclosure } from "@chakra-ui/react";
import TutorialCategoryCard from "../components/cards/tutorialCategoryCard";
import TutorialCategoryCardSmall from "../components/cards/tutorialCategoryCardSmall";
import TutorialCategoryModal from "../components/modals/tutorialCategoryModal";
import Icon from '/public/MoreCategoryIcon.svg'
import IconW from '/public/MoreCategoryIconWhite.svg'

export default function Tutorials() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<[{ name: string, image: string, description: string }]>([{ name: '', image: '', description: '' }]);
  const [isModalContentLoading, setIsModalContentLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentImage, setCurrentImage] = useState(Icon);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8080/tuto/category/all', {
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
    setCurrentCategory(category);
    onOpen();
  };

  function handleMouse(imagePath:any) {
    return () => {
        setCurrentImage(imagePath);
    };
  }

  return (
    (isLoading === true) ?
      <>
        <Navbar />
        <div style={{ padding: "2%", height: "80vh" }}>
          <Spinner animation="border" role="status" style={{ top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', position: 'absolute' }}>
          </Spinner>
          <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', fontSize: '30px', height: '100%', paddingTop: '10%' }}>
            <Text>Loading ...</Text>
          </div>
        </div>
        <Footer />
      </> :
      <>
        <Navbar />
        <div id='content'>
          <div id='wrapper-flex'>
            <div id="suggestions">
              <div id="category-title">
                <h1>SUGGESTIONS</h1>
              </div>
              <div id="wrapper-suggestions-cards">
                <div id="suggestions-cards">
                  {categories.map((item: { name: string, image: string, description: string }) => {
                    return (
                      <TutorialCategoryCard
                        name={item.name}
                        image={item.image}
                        description={item.description}
                        callback={() => showCategoryTutorialsModal(item.name)}
                      />
                    )},
                    ).at(10)
                  }
                </div>
                <div id="suggestions-cards">
                  {categories.map((item: { name: string, image: string, description: string }) => {
                    return (
                      <TutorialCategoryCard
                        name={item.name}
                        image={item.image}
                        description={item.description}
                        callback={() => showCategoryTutorialsModal(item.name)}
                      />
                    )},
                    ).at(1)
                  }
                </div>
              </div>
            </div>
            <div id="easy">
                <div id="category-header">
                  <div id="category-title">
                    <h1>LEVEL EASY</h1>
                  </div>
                  <div id="more-tutorials" onMouseOver={handleMouse(IconW)} onMouseOut={handleMouse(Icon)}>
                    <Image width="25" height="25" src={currentImage} alt="logo"></Image>
                    <a id="link" href="/tutorials/easy">VOIR PLUS</a>
                  </div>
                </div>
                <div id="wrapper-easy-cards">
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
              </div>
            </div>
            <div id="medium">
                <div id="category-header">
                  <div id="category-title">
                    <h1>LEVEL MEDIUM</h1>
                  </div>
                  <div id="more-tutorials" onMouseOver={handleMouse(IconW)} onMouseOut={handleMouse(Icon)}>
                    <Image width="25" height="25" src={currentImage} alt="logo"></Image>
                    <a id="link" href="/tutorials/medium">VOIR PLUS</a>
                  </div>
                </div>
                <div id="wrapper-easy-cards">
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
              </div>
            </div>
            <div id="hard">
                <div id="category-header">
                  <div id="category-title">
                    <h1>LEVEL HARD</h1>
                  </div>
                  <div id="more-tutorials" onMouseOver={handleMouse(IconW)} onMouseOut={handleMouse(Icon)}>
                    <a id="link" href="/tutorials/hard">
                      <Image id="icon" width="30" height="30" src={currentImage} alt="logo"></Image>
                      <span id="title">VOIR PLUS</span>
                    </a>
                  </div>
                </div>
                <div id="wrapper-easy-cards">
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
                  <div id="easy-cards">
                    {categories.map((item: { name: string, image: string, description: string }) => {
                      return (
                        <TutorialCategoryCardSmall
                          name={item.name}
                          image={item.image}
                          description={item.description}
                          callback={() => showCategoryTutorialsModal(item.name)}
                        />
                      )},
                      ).at(0)
                    }
                  </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <TutorialCategoryModal isOpen={isOpen} closeModal={onClose} category={currentCategory} />
      </>
  )
}