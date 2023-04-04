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
// import { tokenPrice } from '../../../utils/globals';
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
import VAULT_INTERFACE from '../../../config/abi/vault.json';
import SuccessAlert from '../../alerts/successAlert/successAlert';

export default function BuyB2STokenModal({ isOpenModal, closeModal }: { isOpenModal: boolean, closeModal: any }) {
  const [amountToBuy, setAmountToBuy] = React.useState(0);
  const [tokenPrice, setTokenPrice] = React.useState('0');
  const [amountToPay, setAmountToPay] = React.useState(0); // amountToPay = amountToBuy * tokenPrice
  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');
  const [isError, setIsError] = React.useState(false);

  useEffect(() => {
    // setAmountToPay(amountToBuy * parseFloat(tokenPrice || '0'))
    // token price is in B2ST per BNB
    if (tokenPrice === '0')
      return;
    setAmountToPay(amountToBuy / parseFloat(tokenPrice || '0'))
  }, [amountToBuy])

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
    onClose();
  }, [account, library])

  useEffect(() => {
    if (!library || !account)
      return;
    async function fetchData() {
      await getExchangeRate();
    }
    fetchData();
    console.log('EHERE')
  }, [library, account])

  const getExchangeRate = async () => {
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = _provider.getSigner();
    const _contract = new ethers.Contract('0x3BeB448c642AF751e74c46641E57a9669c255885', VAULT_INTERFACE, signer)
    let res = await _contract.getExchangeRate();
    console.log('res-exchangeRate: ', res)
    let price: string = ethers.utils.formatEther(res);
    console.log('price: ', price)
    console.log('res: ', res)
    setTokenPrice(price);
  }

  const handleBuy = async () => {
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = await _provider.getSigner();
    console.log('signer: ', signer)
    const _contract = new ethers.Contract('0x3BeB448c642AF751e74c46641E57a9669c255885', VAULT_INTERFACE, signer)
    console.log('_contract: ', _contract)
    let _contract2 = new ethers.Contract('0x532a532C2C755677b86B14089cd7daa1f8DdbCC3', B2ST_INTERFACE_, signer)
    console.log('_contract2: ', _contract2)
    try {
      let res = await _contract.depositBNB({ value: (amountToPay * 10 ** 18).toFixed(0).toString() })
      await res.wait()
      console.log('res: ', res)
      setSuccessMessage('Transaction successful !')
      setIsError(false);
      onOpen();
      setTimeout(() => {
        onClose();
      }, 1500)
      return;
    } catch (error) {
      console.log('error: ', error)
      setErrorMessage('Transaction failed !')
      setIsError(true);
      onOpen();
      setTimeout(() => {
        onClose();
      }, 1500)
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
              <p>1 BNB = {tokenPrice} B2ST</p>
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
                disabled={amountToBuy === 0}
                gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
            </Center>
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
}
