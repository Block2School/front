import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  ModalFooter
} from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from "@web3-react/core";

import {
  BiWallet
} from 'react-icons/bi'
import { sendTransaction } from '../../../utils/sendTransaction'
import CustomButton from '../../button/button'

const DonateModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: any
}) => {

  const donateAddress = '0xE83bC9F463B262362930a272FC4a50e96C51dFFE'
  const [donateAmount, setDonateAmount] = useState('')
  const { account } = useWeb3React()

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup"
     isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">Donate</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} id="close-modal" />
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
          <Text
            paddingBottom={4}
          >
            If you like this project, please consider donating to the following address:
          </Text>
          <InputGroup
            id='donate_address'
            paddingBottom={4}
          >
            <InputLeftElement
              pointerEvents='none'
              fontSize='1.2em'
            >
              <BiWallet />
            </InputLeftElement>
            <Input id='donate_address_input'
              placeholder='0xE83bC9F463B262362930a272FC4a50e96C51dFFE'
              _placeholder={{ color: '#ffe6c4' }}
              disabled
            />
          </InputGroup>
          <InputGroup
            paddingBottom={4}
            id='donate_amount'
          >
            <InputLeftElement
              pointerEvents='none'
              fontSize='1.2em'
            >
              $
            </InputLeftElement>
            <Input
              id='donate_amount_input'
              placeholder='Enter amount'
              _placeholder={{ color: '#ffe6c4' }}
              value={donateAmount}
              type='number'
              onChange={(e) => setDonateAmount(e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'))}
            />
          </InputGroup>
          <div style={{ float: 'right' }}>
            <CustomButton
              id='donate_button_modal'
              name='Donate'
              srcImg={null}
              alt={null}
              size='md'
              disabled={donateAmount === ''}
              variant='solid'
              onClick={() => {
                sendTransaction('ZLDKC', donateAddress, donateAmount, true, account || '')
              }}
              gap={undefined}
              hImg={undefined}
              wImg={undefined}
              borderRadius={undefined}
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DonateModal;