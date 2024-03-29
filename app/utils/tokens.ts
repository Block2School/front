import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
import BEP20_INTERFACE from '../config/abi/bep20.json';
import { AbiItem } from 'web3-utils';
import B2ST_INTERFACE from "../config/abi/B2ST3.json";

type token_address = {
  [key: string]: string | undefined
};

const TOKEN_ADDRESS_TESNET: token_address = {
  'BNB': undefined,
  'ZLDKC': '0x27495B04074Edb7ec458EAE75A5bb1a52Cd4950E',
  'BTCB': '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8',
  'ETH': '0xd66c6B4F0be8CE5b39D52E0Fd1344c389929B378',
  'B2ST': '0x04eBEb70673F5eC6fFAE5607A2EFa11D36E17EA8',
};

const TOKEN_ADDRESS_MAINNET: token_address = {
  'BNB': '',
  'ZLDKC': '',
  'B2ST': '',
  'BTCB': '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
  'ETH': '0x2170Ed0880ac9A755fd29B2688956BD959F933F8'
};

const getTokenAddress = (token: string, testnet: boolean): string | undefined => {
  return testnet ? TOKEN_ADDRESS_TESNET[token] : TOKEN_ADDRESS_MAINNET[token];
}

export { getTokenAddress };

const getTokenContract = (token: string, testnet: boolean): Contract | undefined => {
  let tokenAddress = getTokenAddress(token, testnet);
  if (tokenAddress && token === 'B2ST') {
    return new web3.eth.Contract(
      B2ST_INTERFACE as AbiItem[],
      tokenAddress
    )
  } else if (tokenAddress) {
    return new web3.eth.Contract(
      BEP20_INTERFACE as AbiItem[],
      tokenAddress
    )
  }
  return undefined;
}

export default getTokenContract;