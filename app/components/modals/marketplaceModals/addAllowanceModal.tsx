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

import CustomButton from '../../button/button';
import Web3 from "web3";
import B2ST_INTERFACE_ from "../../../config/abi/B2ST2.json";
import { ethers } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

export default function AddAllowanceModal({ isOpenModal, closeModal }: { isOpenModal: boolean, closeModal: any }) {
  const [amountToApprove, setAmountToApprove] = React.useState(0);
  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    console.log('library: ', library)
    console.log('account: ', account)
    if (!library || !account) {
      console.log('library: ', library, 'account: ', account, "not connected")
      setErrorMessage('Please connect to your wallet first !')
      setIsError(true);
      onOpen();
      return;
    }
    setIsError(false);
    setErrorMessage('');
  }, [library, account]);

  const handleAllowance = async () => {
    console.log('handleAllowance');
    if (!library || !account)
      return;
    const signer = library?.getSigner(account);
    let _contract2 = new ethers.Contract('0x04eBEb70673F5eC6fFAE5607A2EFa11D36E17EA8', B2ST_INTERFACE_, signer)
    try {
      console.log('amountToApprove: ', amountToApprove.toString());
      let res = await _contract2.approve('0x8fE921C13825003F02F46EF261589a3bb7bc7B98', ethers.utils.parseUnits(amountToApprove.toString(), 18));
      await res.wait();
      console.log('res: ', res)
    } catch (error) {
      console.log('WTF THERE IS AN ERROR: ', error)
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
          <ModalHeader>Approve B2ST Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Text>Approve B2ST Token to be used by the marketplace</Text>
              <NumberInput
                defaultValue={0}
                min={0}
                onChange={(value) => setAmountToApprove(parseFloat(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>

              </NumberInput>
              <CustomButton
                onClick={handleAllowance}
                name="Approve"
                id="buyB2ST"
                size="lg"
                variant="success"
                disabled={!active || amountToApprove <= 0 || !amountToApprove} gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}
                categoryGA={'Button'} labelGA={'Giving allowance'}
              />
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}