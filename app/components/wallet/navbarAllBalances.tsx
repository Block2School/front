import { useEffect, useState } from "react";
import { Image, HStack } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import CountUp from 'react-countup';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { getFullDisplayBalance } from "../../utils/format";
import getTokenContract from "../../utils/tokens";
import NavbarBalance from "./navbarBalance";

export default function NavbarAllBalances() {
  const { account, library, chainId, activate, deactivate, active } = useWeb3React();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET

  const [ balanceBNB, setBalanceBNB ] = useState('');
  const [ balanceB2ST, setBalanceB2ST ] = useState('');
  const [ balanceETH, setBalanceETH ] = useState(0);
  const [ balanceCustomToken, setBalanceCustomToken ] = useState(0);

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      web3.eth.getBalance(account ? account : '').then((res: any) => {
        setBalanceBNB(web3.utils.fromWei(res, 'ether'));
      });
    }
  }, [account]);

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      let contract: Contract | undefined = getTokenContract('ZLDKC', true);
      if (contract) {
        contract.methods.balanceOf(account).call().then((res: any) => {
          console.log('CustomTokenBalance : ', res);
          console.log('ZLDKC : getFullDisplayBalance : ', getFullDisplayBalance(res, 8, 2));
          let r: number = parseFloat(getFullDisplayBalance(res, 8, 2));
          console.log('CustomTokenBalance r: ', r);
          setBalanceCustomToken(r);
        });
      }
    }
  }, [account]);

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      let contract: Contract | undefined = getTokenContract('B2ST', true);
      if (contract) {
        contract.methods.balanceOf(account).call().then((res: any) => {
          console.log('CustomTokenBalance B2ST : ', res);
          console.log('B2ST : getFullDisplayBalance : ', getFullDisplayBalance(res, 8, 2));
          // let r: number = parseFloat(getFullDisplayBalance(res, 8, 2));
          let r: string = getFullDisplayBalance(res, 8, 2);
          console.log('CustomTokenBalance B2ST r: ', r);
          setBalanceB2ST(r);
        });
      }
    }
  }, [account])

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      let contract: Contract | undefined = getTokenContract('ETH', true);
      if (contract) {
        contract.methods.balanceOf(account).call().then((res: any) => {
          console.log('ETH BALANCE : ', res);
          console.log('ETH : getFullDisplayBalance : ', getFullDisplayBalance(res, 8, 2));
          let r: number = parseFloat(web3.utils.fromWei(res, 'ether'));
          console.log('CustomTokenBalance r: ', r);
          setBalanceETH(r);
        });
      }
    }
  }, [account]);

  return (
    <>
      <HStack>
        {active ? (
          <>
            <div id="balances">
              {/* <NavbarBalance balanceToken={balanceETH} ImgSrc="/ethereum-eth-logo.svg" alt="ETH logo"/> */}
              <NavbarBalance balanceToken={balanceB2ST} ImgSrc="/Logo_B2S.png" alt="B2S logo" _decimal={2}/>
              <NavbarBalance balanceToken={balanceBNB} ImgSrc="/Binance-BNB-Icon2-Logo.wine.svg" alt="BNB logo" _decimal={3}/>
            </div>
          </>
        ) : (
          <>
            <div id="balances">
              <NavbarBalance balanceToken={null} ImgSrc="/ethereum-eth-logo.svg" alt="ETH logo" _decimal={2}/>
              <NavbarBalance balanceToken={null} ImgSrc="/Binance-BNB-Icon2-Logo.wine.svg" alt="BNB logo" _decimal={3}/>
            </div>
          </>
        )}
      </HStack>
    </>
  );
};