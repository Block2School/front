import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Center,
  Grid
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const TutorialCard = ({
  id, title
}: { id: number, title: string }) => {
  return (
    <Link href={{
      pathname: '/tutorial',
      query: { tutorialId: id }
    }} passHref>
      <Box maxW='sm' p={10} borderWidth={1} borderRadius="lg" overflow='hidden'>
        <Text>{title}</Text>
      </Box>
    </Link>
  );
}

const TutorialCategoryModal = ({
  isOpen, closeModal, category
}: { isOpen: boolean, closeModal: any, category: string }) => {
  const [tutorials, setTutorials] = useState<[{ id: number, title: string, markdownUrl: string, category: string, answer: string, startCode: string, shouldBeCheck: boolean, enabled: boolean }]>([{
    id: 0,
    title: "",
    markdownUrl: "",
    category: "",
    answer: "",
    startCode: "",
    shouldBeCheck: false,
    enabled: false
  }]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!category) { return; }
    setIsLoading(true);
    axios.get(`http://localhost:8080/tuto/category/${category}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setTutorials(res.data.data);
      setIsLoading(false);
    })
  }, [category]);

  if (isOpen === false)
    return null;
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {category}
        </ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
          id="close-modal-tuto"
        />
        <ModalBody>
          {isLoading ? <Text>Loading...</Text> :
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={4}
            >
              {
                tutorials.map((tutorial, index) => (
                  // <Text key={index}>{tutorial.title}</Text>
                  <TutorialCard key={index} id={tutorial.id} title={tutorial.title} />
                ))
              }
            </Grid>
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TutorialCategoryModal;