import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Grid,
  Input,
  Button,
  Image
} from '@chakra-ui/react'
import axios from 'axios'
import { serverURL } from '../../../utils/globals'
import { useState } from 'react'
import QRCode from 'qrcode'

const ReactivateTwoFAModal = ({
    isOpen,
    closeModal,
    handleState2FA,
    generate
  }: {
    isOpen: boolean
    closeModal: any
    handleState2FA: any
    generate: any
  }) => {

  const list = [""]
  const [linkQR, setLinkQR] = useState('')

  async function setup2FAWordList (wordlist: string) {
    let res = await axios.post(`${serverURL}:8080/user/authenticator/qrcode`, {
      wordlist: wordlist,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        'Access-Control-Allow-Origin': '*',
      }
    })
    if (res.status === 200) {
      QRCode.toDataURL(res.data.qr).then(setLinkQR)
    }
  }

  async function handleWordList() {
    await setup2FAWordList(list.join(' '))
  }

  async function handleClose() {
    await handleState2FA()
    closeModal()
  }

  if (isOpen === false) {
    return null
  }
  if (linkQR === "") {
    return (
      <Modal id="modal_popup" size={'xl'} isOpen={isOpen} onClose={handleClose} isCentered preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader id="modal_popup">Reactivate TwoFA Authentificator</ModalHeader>
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
              <Button onClick={handleWordList}>Confirm</Button>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  } else {
    return(
      <Modal id="modal_popup" size={'xl'} isOpen={isOpen} onClose={handleClose} isCentered preserveScrollBarGap>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader id="modal_popup">New QRCode TwoFA Authentificator</ModalHeader>
            <ModalCloseButton _focus={{ boxShadow: 'none'}} id="close-modal" onClick={handleClose}/>
            <ModalBody id="modal_popup" paddingBottom="1.5rem">
              <Image src={linkQR}></Image>
            </ModalBody>
          </ModalContent>
      </Modal>
    )
  }
}

export default ReactivateTwoFAModal
