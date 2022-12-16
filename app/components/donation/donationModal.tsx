import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { connectors } from '../wallet/injectors'

const DonationModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean
  closeModal: any
}) => {
  const [donationAmount, setDonationAmount] = useState(0)
  const [provider, setProvider] = useState<any>()
  const { activate } = useWeb3React()

  useEffect(() => {
    const prov = window.localStorage.getItem('provider')
    if (prov) setProvider(connectors[prov])
  }, [])

  const handleDonation = () => {
    console.log('donationAmount', donationAmount)
    // Open the corresponding wallet and send the donation amount using the provider

    const signer = provider.getSigner()
    const address = '0xE83bC9F463B262362930a272FC4a50e96C51dFFE'
    const amount = donationAmount
    const tx = {
      to: address,
      value: amount,
    }
    signer.sendTransaction(tx)

    console.log('touyut')
    // Close the modal
    closeModal()
  }

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_donation" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader id="modal_donation">Donate</ModalHeader>
        <ModalCloseButton
          _focus={{
            boxShadow: 'none',
          }}
          id="close-modal"
        />
        <ModalBody id="modal_donation" paddingBottom="1.5rem">
          {/* donation form */}
          <HStack w="100%" justifyContent="center">
            <Input
              id="donation-input"
              placeholder="Enter amount"
              type="number"
            />
            <Button
              id="donation-button"
              variant="outline"
              onClick={() => {
                handleDonation()
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
                />
                <Text>Donate</Text>
              </HStack>
            </Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DonationModal;