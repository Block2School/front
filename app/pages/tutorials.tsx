import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Spinner } from "react-bootstrap";
import { calc, Center, Grid, Text, useDisclosure } from "@chakra-ui/react";
import TutorialCategoryCard from "../components/cards/tutorialCategoryCard";
import TutorialCategoryModal from "../components/modals/tutorialCategoryModal";

export default function Tutorials() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<[{ name: string, image: string, description: string }]>([{ name: '', image: '', description: '' }]);
  const [isModalContentLoading, setIsModalContentLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCategory, setCurrentCategory] = useState('');

  useEffect(() => {
    setIsLoading(true);
    console.log('HELLL MAN')
    axios.get('http://localhost:8080/tuto/category/all', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      // setCategories([...categories, res.data.data]);
      setCategories(res.data.data);
      console.log('categories1: ', res.data.data);
      // setIsLoading(false);
      setTimeout(() => { setIsLoading(false); console.log('categories2: ', categories) }, 500);
    })
  }, []);

  const showCategoryTutorialsModal = (category: string) => {
    console.log('JE VAIS TE GOUMER FDP')
    setCurrentCategory(category);
    onOpen();
  };

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
        <div style={{ padding: "2%" }}>
          <Center>
            <Grid templateColumns='repeat(3, 1fr)' alignSelf='center' alignItems='center' alignContent='center' gap={10}>
              {categories.map((item: { name: string, image: string, description: string }) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <TutorialCategoryCard
                    name={item.name}
                    image={item.image}
                    description={item.description}
                    callback={() => showCategoryTutorialsModal(item.name)}
                  />
                )
              })}
            </Grid>
          </Center>
        </div>
        <Footer />
        <TutorialCategoryModal isOpen={isOpen} closeModal={onClose} category={currentCategory} />
      </>
  );
}