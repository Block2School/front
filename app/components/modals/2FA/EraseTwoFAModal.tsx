import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Input,
  Button
} from '@chakra-ui/react'

const EraseTwoFAModal = ({
    isOpen,
    closeModal,
    erase2FA,
    handleState2FA
  }: {
    isOpen: boolean
    closeModal: any
    erase2FA: any
    handleState2FA: any
  }) => {

  const list = [""]

  async function handleWordList() {
    await erase2FA(list.join(' '))
  }

  async function handleClose() {
    await handleState2FA()
    closeModal()
  }

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" size={'xl'} isOpen={isOpen} onClose={handleClose} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">Disable TwoFA Authentificator</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal" onClick={handleClose}/>
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
          <Grid templateColumns='repeat(4, 2fr)' gap={6}>
            <Input placeholder={`Word 1`} value={list[1]} onChange={(e) => list[0] = e.target.value}></Input>
            <Input placeholder={`Word 2`} value={list[2]} onChange={(e) => list[1] = e.target.value}></Input>
            <Input placeholder={`Word 3`} value={list[3]} onChange={(e) => list[2] = e.target.value}></Input>
            <Input placeholder={`Word 4`} value={list[4]} onChange={(e) => list[3] = e.target.value}></Input>
            <Input placeholder={`Word 5`} value={list[5]} onChange={(e) => list[4] = e.target.value}></Input>
            <Input placeholder={`Word 6`} value={list[6]} onChange={(e) => list[5] = e.target.value}></Input>
            <Input placeholder={`Word 7`} value={list[7]} onChange={(e) => list[6] = e.target.value}></Input>
            <Input placeholder={`Word 8`} value={list[8]} onChange={(e) => list[7] = e.target.value}></Input>
            <Input placeholder={`Word 9`} value={list[9]} onChange={(e) => list[8] = e.target.value}></Input>
            <Input placeholder={`Word 10`} value={list[10]} onChange={(e) => list[9] = e.target.value}></Input>
            <Button color={'black'} onClick={handleWordList}>Confirm</Button>
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default EraseTwoFAModal
