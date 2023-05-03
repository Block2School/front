import React, { useEffect } from 'react';
import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  HStack,
  Text,
  Center,
  useDisclosure,
  Image,
  Button
} from '@chakra-ui/react'

import CustomButton from '../../button/button';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ErrorAlert from '../../alerts/errorAlert/errorAlert';
import SuccessAlert from '../../alerts/successAlert/successAlert';
import NFT_INTERFACE from '../../../config/abi/nft.json';
import NFT_INTERFACE2 from '../../../config/abi/nft2.json';

interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
  owner: string;
}

export default function BuyNFTModal({ isOpenModal, closeModal, _nft }: { isOpenModal: boolean, closeModal: any, _nft: NFT }) {
  const { account, library } = useWeb3React<Web3Provider>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buyNFT = async () => {
    try {
      console.log('buyNFT')
      const signer = library?.getSigner(account);
      console.log('buyNFT2')
      // const contract = new ethers.Contract("0x814ed598FBBcD0AA466f1a0aAEE8603Ae55b96D3", NFT_INTERFACE, signer);
      const contract = new ethers.Contract("0xe06855c206CE89A23b480246Cbc208c5A6deAAF8", NFT_INTERFACE2, signer)
      console.log('buyNFT3')
      const tx = await contract.createMarketSale(_nft.id, { value: ethers.utils.parseEther(_nft.price) });
      console.log('tx: ', tx)
      await tx.wait();
      setSuccessMessage('NFT bought successfully !');
      setIsError(false);
      onOpen();
    } catch (err) {
      console.log('err: ', err)
      setIsError(true);
      setErrorMessage('Error while buying NFT !');
      onOpen();
    }
  }

  if (isOpenModal === false) {
    return null;
  }
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontWeight="bold"
            fontSize="2xl"
          >
            Buying confirmation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text
              fontWeight="bold"
              fontSize="xl"
            >{_nft.name}</Text>
            <Center>
              <Image src={_nft.image} alt={_nft.name} />
            </Center>
            <VStack spacing={4}>
              <Text>Price: {_nft.price} BNB</Text>
              <Button
                colorScheme="teal"
                onClick={() => buyNFT()}
              >
                Buy
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isError === true ?
        <ErrorAlert
          errorMessage={errorMessage}
          isOpen={isOpen}
          onClose={onClose}
        />
        : <SuccessAlert
          successMessage={successMessage}
          isOpen={isOpen}
          onClose={onClose}
        />}
    </>
  )
};