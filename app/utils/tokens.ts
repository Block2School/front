import Web3 from "web3";
import {Contract} from 'web3-eth-contract';
// import BEP20_INTERFACE from "../config/abi/bep20";
// const web3 = new Web3('https://bsc-dataseed1.binance.org:443'); // MAINNET
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
import BEP20_INTERFACE from '../config/abi/bep20.json';

const getTokenAddress = (token: string, testnet: boolean): string | undefined => {
  if (token === 'BNB') {
    return testnet ? '' : '';
  }
  if (token === 'ZLDKC') {
    return testnet ? '0x27495B04074Edb7ec458EAE75A5bb1a52Cd4950E' : ''; 
  }
  if (token === 'BTCB') {
    return testnet ? '0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8' : '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c';
  }
  return undefined;
}

export {getTokenAddress};

const getTokenContract = (token: string, testnet: boolean): Contract | undefined => {
  let tokenAddress = getTokenAddress(token, testnet);
  if (tokenAddress) {
    return new web3.eth.Contract([{
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }], tokenAddress);
  }
  return undefined;
}

export default getTokenContract;