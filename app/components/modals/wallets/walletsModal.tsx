import {
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../../wallet/injectors'

const SelectWalletModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: any
}) => {
  const { activate } = useWeb3React()

  const setProvider = (type: any) => {
    window.localStorage.setItem('provider', type)
  }
  // console.log('isOpen', isOpen);
  if (isOpen === false) {
    return null
  }
  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
          id="close-modal"
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.coinbaseWallet)
                setProvider('coinbaseWallet')
                closeModal()
                isOpen = false
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="/coinbase_wallet_appicon.svg"
                  alt="Coinbase Wallet Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Coinbase Wallet</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.injected)
                setProvider('injected')
                closeModal()
                isOpen = false
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="metamask_appicon.svg"
                  alt="MetaMask Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>MetaMask</Text>
              </HStack>
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.binanceWallet)
                setProvider('binanceWallet')
                closeModal()
                isOpen = false
              }}
              w="100%"
            >
              <HStack w="100%" justifyContent="center">
                <Image
                  src="binance_wallet_appicon.svg"
                  alt="Binance Wallet Logo"
                  width={25}
                  height={25}
                  borderRadius="3px"
                />
                <Text>Binance Wallet</Text>
              </HStack>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default SelectWalletModal
