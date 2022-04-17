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
  Input,
  Select,
  Box
} from '@chakra-ui/react';

import { Image } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { connectors } from '../../wallet/injectors';

const SelectWalletModal = ({
  isOpen, closeModal
}: { isOpen: boolean, closeModal: any }) => {
  const { activate } = useWeb3React();

  const setProvider = (type) => {
    window.localStorage.setItem('provider', type);
  }

  return (
    <Modal isOpen={isOpen} onClose={closeModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Wallet</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
        />
        <ModalBody paddingBottom="1.5rem">
          <VStack>
            <Button
              variant="outline"
              onClick={() => {
                activate(connectors.coinbaseWallet);
                setProvider('coinbaseWallet');
                closeModal();
              }}
              w="100%"
            >
              <HStack
                w="100%"
                justifyContent="center"
              >
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
                activate(connectors.injected);
                setProvider('injected');
                closeModal();
              }}
              w="100%"
            >
              <HStack
                w="100%"
                justifyContent="center"
              >
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
                activate(connectors.binanceWallet);
                setProvider('binanceWallet');
                closeModal();
              }}
              w="100%"
            >
              <HStack
                w="100%"
                justifyContent="center"
              >
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
};

export default SelectWalletModal;