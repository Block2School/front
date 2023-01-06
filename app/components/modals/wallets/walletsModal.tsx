import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../../wallet/injectors'
import CustomButton from '../../button/button'

const SelectWalletModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: any
}) => {
  const { activate } = useWeb3React()

  const setProvider = (type: any) => {
    window.sessionStorage.setItem('provider', type)
  }
  // console.log('isOpen', isOpen);
  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_popup">Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
          id="close-modal"
        />
        <ModalBody id="modal_popup" paddingBottom="1.5rem">
          <VStack>
            <CustomButton id='coinbase' srcImg="/coinbase_wallet_appicon.svg" alt="Coinbase Wallet Logo" wImg={25} hImg={25} gap={3} name="Coinbase Wallet" variant="outline" borderRadius="3px" onClick={() => {
              activate(connectors.coinbaseWallet)
              setProvider('coinbaseWallet')
              closeModal()
              isOpen = false
            } } size={undefined} disabled={undefined}/>
            <CustomButton name="MetaMask" id="metamask"
            variant="outline"
            onClick={() => {
              activate(connectors.injected)
              setProvider('injected')
              closeModal()
              isOpen = false
            } } srcImg="metamask_appicon.svg" alt="MetaMask Logo" wImg={25} hImg={25} gap={3} size={undefined} disabled={undefined} borderRadius={undefined}/>
            <CustomButton name="Binance Wallet" id="binance" variant="outline"
            onClick={() => {
              activate(connectors.binanceWallet)
              setProvider('binanceWallet')
              closeModal()
              isOpen = false
            } } srcImg="binance_wallet_appicon.svg" alt="Binance Wallet Logo" wImg={25} hImg={25} gap={3} size={undefined} disabled={undefined} borderRadius={undefined}/>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectWalletModal
