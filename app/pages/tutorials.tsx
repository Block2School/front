import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Spinner } from "react-bootstrap";
import { Text, VStack } from "@chakra-ui/react";
import TutorialCategoryCard from "../components/cards/tutorialCategoryCard";

export default function Tutorials() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<[{name: string, image: string}]>([{name: "", image: ""}]);

  const [categoryTutorials, setCategoryTutorials] = useState([{}]);

  useEffect(() => {
    setIsLoading(true);
    axios.get('http://localhost:8080/tuto/category/', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      // setCategories([...categories, res.data.data]);
      setCategories(res.data.data);
      console.log('categories1: ', res.data.data);
      // setIsLoading(false);
      setTimeout(() => {setIsLoading(false); console.log('categories2: ', categories)}, 5000);
    })
  }, []);

  const retrieveTutorialList = (category: string) => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/tuto/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setCategoryTutorials(res.data);
      setTimeout(() => setIsLoading(false), 1000);
    })
  };

  return (
    (isLoading === true) ?
      <>
        <Navbar />
        <Spinner animation="border" role="status" style={{ top: 0, bottom: 0, left: 0, right: 0, margin: 'auto', position: 'absolute' }}>
        </Spinner>
        <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center', justifyContent: 'center', fontSize: '30px', height: '100%', paddingTop: '10%' }}>
          <Text>Loading ...</Text>
        </div>
        <Footer />
      </> :
      <>
        <Navbar />
        <div>
          <VStack>
            {categories.map((item: {name: string, image: string}) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <TutorialCategoryCard
                  name={item.name}
                  image={item.image}
                />
              )
            })}
            {/* <TutorialCategoryCard/> */}
          </VStack>
        </div>
        <Footer />
      </>  
  );
}