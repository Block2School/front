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
  Center
} from '@chakra-ui/react'
import { tokenPrice } from '../../../utils/globals';
import CustomButton from '../../button/button';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import getTokenContract from "../../../utils/tokens";
import { useWeb3React } from '@web3-react/core';
import { getFullDisplayBalance } from '../../../utils/format';


export default function BuyB2STokenModal({ isOpen, closeModal }: { isOpen: boolean, closeModal: any }) {
  const [amountToBuy, setAmountToBuy] = React.useState(0)
  const [amountToPay, setAmountToPay] = React.useState(0) // amountToPay = amountToBuy * tokenPrice
  const { account, library, chainId, activate, deactivate, active } = useWeb3React();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET

  useEffect(() => {
    setAmountToPay(amountToBuy * parseFloat(tokenPrice || '0'))
  }, [amountToBuy])

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
      let receiverAddress = '0xf1F3Ad462941E9d1C615E405C05B75516B61fbb0'
      console.log('amount2 === ', web3.utils.toWei(((amountToBuy/10).toFixed(9)).toString(), 'gwei'))
      // contract.methods.transfer(receiverAddress, web3.utils.toWei(((amountToBuy/10).toFixed(9)).toString(), 'gwei')).send({ from: account }).then((res: any) => {
      //   console.log('RES: ', res)
      // })
      let encoded: any = contract.methods.transfer(receiverAddress, web3.utils.toWei(((amountToBuy/10).toFixed(9)).toString(), 'gwei')).encodeABI();
      console.log('encoded: ', encoded)
      let block: any = await web3.eth.getBlock('latest');
      console.log('block: ', block)
      let gasLimit = Math.round(block.gasLimit / block.transactions.length);

      let tx = {
        // from: account,
        to: receiverAddress,
        data: encoded,
        gas: gasLimit,
      }
      console.log('tx: ', tx)
      let accounts_: any = await web3.eth.getAccounts().then((res: any) => {
        console.log('res: ', res)
        return res
      });
      console.log('accounts_: ', accounts_)
      // web3.eth.accounts.signTransaction(tx, privateKey).then(signed => {
      //   web3.eth.sendSignedTransaction(signed.rawTransaction).on('receipt', console.log);
      // })
    }
  }

  if (isOpen === false) {
    return null
  }
  return (
    <Modal id="modal_popup" isOpen={isOpen} onClose={closeModal} isCentered preserveScrollBarGap>
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
          <Center>
            <CustomButton
              name="Buy"
              id="buyB2ST2"
              size="lg"
              variant="success"
              onClick={handleBuy}
              gap={undefined} srcImg={undefined} alt={undefined} disabled={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
