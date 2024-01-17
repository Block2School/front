import React, { useEffect, useContext } from 'react';
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
import NFT_INTERFACE3 from '../../../config/abi/nft3.json';
import { sendGAEvent } from '../../../utils/utils';
import { LanguageContext } from '../../LanguageSwitcher/language';

interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
  owner: string;
  currency: string;
  currencyAddress: string;
}

export default function BuyNFTModal({ isOpenModal, closeModal, _nft }: { isOpenModal: boolean, closeModal: any, _nft: NFT }) {
  const { account, library } = useWeb3React<Web3Provider>();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { dictionary } = useContext(LanguageContext);

  const buyNFT = async () => {
    try {
      const signer = library?.getSigner(account);
      const contract = new ethers.Contract("0x8fE921C13825003F02F46EF261589a3bb7bc7B98", NFT_INTERFACE3, signer)
      let tx;
      if (_nft.currency === "BEP20")
        tx = await contract.createMarketSaleV2(_nft.id)
      else
        tx = await contract.createMarketSale(_nft.id, { value: ethers.utils.parseEther(_nft.price) });
      await tx.wait();
      setSuccessMessage('NFT bought successfully !');
      setIsError(false);
      onOpen();
    } catch (err: any) {
      setIsError(true);
      if (err.code === -32603 || err?.data?.message == "execution reverted: Sender does not have enough allowance") {
        setErrorMessage('Please approve the contract to spend your B2ST tokens first ! To do so, click on the "Give Allowance" button next to the "Buy B2ST" one.');
      } else {
        setErrorMessage('Something went wrong. Could not buy NFT.');
      }
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
            {dictionary.buy_nft_modal.modal_header}
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
              <Text>{dictionary.buy_nft_modal.modal_price}: {_nft.price} {_nft.currency === "BNB" ? "BNB" : "B2ST"}</Text>
              <Button
                colorScheme="teal"
                onClick={() => {
                  sendGAEvent('buyNFTModal', 'button_click', 'buyNFT')
                  buyNFT()
                }}
              >
                {dictionary.buy_nft_modal.modal_button}
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