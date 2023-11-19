import React, { useEffect, useState } from 'react';
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
  NumberInputStepper,
  HStack,
  Select
} from '@chakra-ui/react'
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import ErrorAlert from '../../alerts/errorAlert/errorAlert';
import SuccessAlert from '../../alerts/successAlert/successAlert';
import NFT_INTERFACE from '../../../config/abi/nft.json';
import NFT_INTERFACE2 from '../../../config/abi/nft2.json';
import NFT_INTERFACE3 from '../../../config/abi/nft3.json';
import { sendGAEvent } from '../../../utils/utils';

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
  // sellCurrency can either be BNB or B2ST
  const [sellCurrency, setSellCurrency] = useState<'BNB' | 'B2ST'>('BNB');

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
      console.log('sellNFT: sellCurrency: ', sellCurrency)
      const signer = library?.getSigner(account);
      const isBNB: boolean = sellCurrency === 'BNB';
      console.log('sellNFT: isBNB: ', isBNB);
      // const contract = new ethers.Contract("0xe06855c206CE89A23b480246Cbc208c5A6deAAF8", NFT_INTERFACE2, signer);
      const contract = new ethers.Contract("0x8fE921C13825003F02F46EF261589a3bb7bc7B98", NFT_INTERFACE3, signer);
      const tx = await contract.resellTokenV2(_nft.id, ethers.utils.parseEther(priceToSet.toString()).toString(), isBNB, { value: ethers.utils.parseEther(listingPrice.toString()).toString() });
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
              <HStack
                spacing={4}
                w="100%"
                justifyContent="center"
              >
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
                {/* add a dropdown field */}
                <Select
                  value={sellCurrency}
                  w="20%"
                  onChange={(e: { target: { value: string; }; }) => setSellCurrency(e.target.value as 'BNB' | 'B2ST')}
                >
                  <option value="BNB">BNB</option>
                  <option value="B2ST">B2ST</option>
                </Select>
              </HStack>
            </VStack>
            <Center>
              <Button
                mt={4}
                colorScheme="blue"
                onClick={() => {
                  sendGAEvent('SellNFT', 'button_click', 'NFT sell button')
                  sellNFT()
                }}
              >
                Sell NFT ({sellCurrency})
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