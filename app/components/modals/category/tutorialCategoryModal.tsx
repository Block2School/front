import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Grid,
} from '@chakra-ui/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { serverURL } from '../../../utils/globals'
import TutorialCards from '../../cards/tutorialCards'

const TutorialCategoryModal = ({
  isOpen,
  closeModal,
  category,
}: {
  isOpen: boolean
  closeModal: any
  category: string
}) => {
  const [tutorials, setTutorials] = useState
    <[
      {
        id: number
        title: string
        markdownUrl: string
        category: string
        answer: string
        startCode: string
        shouldBeCheck: boolean
        enabled: boolean
      }
    ]>
  ([
    {
      id: 0,
      title: '',
      markdownUrl: '',
      category: '',
      answer: '',
      startCode: '',
      shouldBeCheck: false,
      enabled: false,
    }
  ])
  
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!category) {
      return
    }
    setIsLoading(true)
    axios.get(`${serverURL}:8080/tuto/category/${category}`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
    }).then((res) => {
        setTutorials(res.data.data)
        setIsLoading(false)
    })
  }, [category])

  if (isOpen === false)
    return null
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader id="modal-card-header">{category}</ModalHeader>
        <ModalCloseButton id="close-modal-tuto"/>
        <ModalBody id="modal-card-body">
          {isLoading ? (
            <Text>Loading...</Text>
          ) : (
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
              <TutorialCards tutorials={tutorials}/>
            </Grid>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TutorialCategoryModal
