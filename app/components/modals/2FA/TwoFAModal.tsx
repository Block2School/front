import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Text
} from '@chakra-ui/react'

const TwoFAModal = ({
    isOpen,
    closeModal,
    qr_code,
    wordlist
    
  }: {
    isOpen: boolean
    closeModal: any
    qr_code: string
    wordlist: string
  }) => {

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">TwoFA Authentificator</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal"/>
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
        <Image src={qr_code}></Image>
        <Text>{wordlist}</Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default TwoFAModal
