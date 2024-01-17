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
import { LanguageContext } from '../../LanguageSwitcher/language';

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
  const [sellCurrency, setSellCurrency] = useState<'BNB' | 'B2ST'>('BNB');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dictionary } = React.useContext(LanguageContext);

  useEffect(() => {
    setSellingPrice(_nft.price);
  }, [_nft.price]);

  const sellNFT = async () => {
    const priceToSet: string = sellingPrice;
    try {
      const signer = library?.getSigner(account);
      const isBNB: boolean = sellCurrency === 'BNB';
      const contract = new ethers.Contract("0x8fE921C13825003F02F46EF261589a3bb7bc7B98", NFT_INTERFACE3, signer);
      const tx = await contract.resellTokenV2(_nft.id, ethers.utils.parseEther(priceToSet.toString()).toString(), isBNB, { value: ethers.utils.parseEther(listingPrice.toString()).toString() });
      await tx.wait();
      setSuccessMessage(dictionary.my_nft_modal.success_msg);
      setIsError(false);
      onOpen();
    } catch (error) {
      setIsError(true);
      setErrorMessage(dictionary.my_nft_modal.error_msg);
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
              {dictionary.my_nft_modal.reminder_msg} {listingPrice} BNB
              </Text>
              <Text>{dictionary.my_nft_modal.price}: </Text>
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
                {dictionary.my_nft_modal.sell} ({sellCurrency})
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