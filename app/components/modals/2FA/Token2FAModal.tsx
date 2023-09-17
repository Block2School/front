import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input
} from '@chakra-ui/react'
import { Button } from 'react-bootstrap'

const Token2FAModal = ({
    isOpen,
    closeModal,
    setToken,
    setTokenReady
  }: {
    isOpen: boolean
    closeModal: any
    setToken: any
    setTokenReady: any
  }) => {

  let value = ""

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">Enter Token Authentificator</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal"/>
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
        <Input onChange={(event) => setToken(event.target.value)}></Input>
        <Button onClick={() => {setTokenReady()
        {isOpen=false}}}> Authenticate </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Token2FAModal
