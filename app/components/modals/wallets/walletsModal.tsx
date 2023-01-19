import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import LoginOptions from './walletsLoginOptions'

const SelectWalletModal = ({
    isOpen,
    closeModal,
  }: {
    isOpen: boolean
    closeModal: any
  }) => {

  // console.log('isOpen', isOpen);
  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">Select Wallet</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal"/>
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
        <LoginOptions isOpen={isOpen} closeModal={closeModal}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectWalletModal
