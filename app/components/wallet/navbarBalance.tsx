import { useEffect, useState } from "react";
import { Image, HStack, Text } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import CountUp from 'react-countup';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import { getFullDisplayBalance } from "../../utils/format";
import getTokenContract from "../../utils/tokens";

export default function NavbarBalance() {
  const { account, library, chainId, activate, deactivate, active } = useWeb3React();
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET

  const [ balanceBNB, setBalanceBNB ] = useState('');
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
            <HStack>
              <CountUp
                start={0}
                end={balanceETH}
                duration={0.5}
                separator=","
                decimal="."
                decimals={4}
                style={{ color: 'white'}}
              />
              <Image
                src="/Binance-BNB-Icon2-Logo.wine.svg"
                alt="BNB logo"
                height={55}
                width={55}
              />
              <CountUp
                start={0}
                end={parseFloat(balanceBNB)}
                duration={0.5}
                separator=","
                decimal="."
                decimals={4}
                style={{ color: 'white'}}
              />
              <Image
                src="/Binance-BNB-Icon2-Logo.wine.svg"
                alt="BNB logo"
                height={55}
                width={55}
              />
            </HStack>
          </>
        ) : (
          <>
            <HStack>
              <Text color="white"> 0.0000</Text>
              <Image
                src="/Binance-BNB-Icon2-Logo.wine.svg"
                alt="BNB logo"
                height={35}
                width={35}
                style={{ color: 'white'}}
              />
            </HStack>
          </>
        )}
      </HStack>
    </>
  );
};