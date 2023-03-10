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
  useDisclosure
} from '@chakra-ui/react'
import { tokenPrice } from '../../../utils/globals';
import CustomButton from '../../button/button';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import getTokenContract from "../../../utils/tokens";
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getFullDisplayBalance } from '../../../utils/format';
import B2ST_INTERFACE_ from '../../../config/abi/B2ST2.json';
import { ethers } from 'ethers';
import ErrorAlert from '../../alerts/errorAlert/errorAlert';

export default function BuyB2STokenModal({ isOpenModal, closeModal }: { isOpenModal: boolean, closeModal: any }) {
  const [amountToBuy, setAmountToBuy] = React.useState(0);
  const [amountToPay, setAmountToPay] = React.useState(0); // amountToPay = amountToBuy * tokenPrice
  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    setAmountToPay(amountToBuy * parseFloat(tokenPrice || '0'))
  }, [amountToBuy])

  useEffect(() => {
    console.log('library: ', library)
    console.log('account: ', account)
    if (!library || !account) {
      console.log('library: ', library, 'account: ', account, "not connected")
      console.log('zebi')
      setErrorMessage('Please connect to your wallet first !')
      onOpen();
      return;
    }
    onClose();
  }, [account, library])

  const handleBuy = async () => {
    console.log('amountToBuy: ', amountToBuy)
    console.log('amountToPay: ', amountToPay)
    let contract: Contract | undefined = getTokenContract('B2ST', true);
    console.log('contract: ', contract)
    console.log('account: ', account)
    if (contract && account) {
      contract.methods.balanceOf(account).call().then((res: any) => {
        console.log('B2ST BALANCE account: ', getFullDisplayBalance(res, 8, 2));
      });
      contract.methods.balanceOf('0xf1F3Ad462941E9d1C615E405C05B75516B61fbb0').call().then((res: any) => {
        console.log('B2ST BALANCE 2: ', getFullDisplayBalance(res, 8, 2));
      });
      // let receiverAddress = '0xf1F3Ad462941E9d1C615E405C05B75516B61fbb0'
      let receiverAddress = '0xE83bC9F463B262362930a272FC4a50e96C51dFFE'
      console.log('amount2 === ', web3.utils.toWei(((amountToBuy / 10).toFixed(9)).toString(), 'gwei'))
      const _provider = new ethers.providers.Web3Provider(library?.provider);
      const signer = await _provider.getSigner();
      console.log('signer: ', signer)
      const _contract = new ethers.Contract('0x532a532C2C755677b86B14089cd7daa1f8DdbCC3', B2ST_INTERFACE_, signer)
      console.log('_contract: ', _contract)
      library?.getBalance(account).then((res: any) => {
        console.log('BALANCE: ', res)
      });
      let res = await _contract.transfer(receiverAddress, 10000000000);
      console.log('res: ', res)
    }
  }

  if (isOpenModal === false) {
    return null
  }
  return (
    <>
      <Modal id="modal_popup" isOpen={isOpenModal} onClose={closeModal} isCentered preserveScrollBarGap>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader id="modal_popup">Buy B2ST</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: 'none' }} id="close-modal" />
          <ModalBody id="modal_popup" paddingBottom="1.5rem">
            <VStack>
              {/* A number input from Chakra UI */}
              <HStack>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  onChange={(valueString) => setAmountToBuy(parseFloat(valueString))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <Text>B2ST</Text>
              </HStack>
              {/* display amountToPay with only 5 digits after the . */}
              <p>= {amountToPay.toFixed(5)} BNB</p>
              <p>1 B2ST = {tokenPrice} BNB</p>
            </VStack>
            <Center
              marginTop="1rem"
            >
              <CustomButton
                name="Buy"
                id="buyB2ST2"
                size="lg"
                variant="success"
                onClick={handleBuy}
                gap={undefined} srcImg={undefined} alt={undefined} disabled={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ErrorAlert
        errorMessage={errorMessage}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  )
}
