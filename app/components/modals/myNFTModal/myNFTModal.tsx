import React, { useEffect } from 'react';
import {
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Center,
  useDisclosure,
  Image,
  Button,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react'
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

export default function MyNFTModal({ isOpenModal, closeModal, _nft, listingPrice }: { isOpenModal: boolean, closeModal: any, _nft: NFT, listingPrice: string }) {
  const { account, library } = useWeb3React<Web3Provider>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [sellingPrice, setSellingPrice] = React.useState(_nft.price);
  const [isError, setIsError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setSellingPrice(_nft.price);
  }, [_nft.price]);

  const sellNFT = async () => {
    console.log('sellNFT: ', _nft);
    const priceToSet: string = sellingPrice;
    try {
      console.log('sellNFT: priceToSet: ', priceToSet);
      console.log('sellNFT: priceToSet2: ', ethers.utils.parseEther(priceToSet.toString()));
      // convert priceToSet to wei
      const signer = library?.getSigner(account);
      const contract = new ethers.Contract("0xe06855c206CE89A23b480246Cbc208c5A6deAAF8", NFT_INTERFACE2, signer);
      const tx = await contract.resellToken(_nft.id, ethers.utils.parseEther(priceToSet.toString()).toString(), { value: ethers.utils.parseEther(listingPrice.toString()).toString() });
      await tx.wait();
      setSuccessMessage('NFT set on sale successfully !');
      setIsError(false);
      onOpen();
    } catch (error) {
      setIsError(true);
      console.log('error: ', error)
      setErrorMessage('Error while setting NFT on sale !');
      onOpen();
    }
  }

  if (isOpenModal === false) return null;
  return (
    <>
      <Modal isOpen={isOpenModal} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            textAlign="center"
            fontSize="2xl"
            fontWeight="bold"
          >
            {_nft.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <Image src={_nft.image} alt={_nft.name} />
            </Center>
            <VStack spacing={4} mt={4}>
              <Text>
                Please remember that you will be charged a listing fee of {listingPrice} BNB
              </Text>
              <Text>Price: </Text>
              <NumberInput
                defaultValue={_nft.price}
                max={100000}
                onChange={(value) => setSellingPrice(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </VStack>
            <Center>
              <Button
                mt={4}
                colorScheme="blue"
                onClick={() => sellNFT()}
              >
                Sell NFT
              </Button>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      {isError === true ?
        <ErrorAlert
          isOpen={isOpen}
          onClose={onClose}
          errorMessage={errorMessage}
        />
        :
        <SuccessAlert
          isOpen={isOpen}
          onClose={onClose}
          successMessage={successMessage}
        />
      }
    </>
  );
};