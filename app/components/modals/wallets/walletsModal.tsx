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
import { useContext } from 'react';
import { LanguageContext } from '../../LanguageSwitcher/language'

const SelectWalletModal = ({
    isOpen,
    closeModal,
  }: {
    isOpen: boolean
    closeModal: any
  }) => {

  const { dictionary } = useContext(LanguageContext);

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">{dictionary.wallets_modal.modal_header}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal"/>
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
        <LoginOptions isOpen={isOpen} closeModal={closeModal}/>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectWalletModal
