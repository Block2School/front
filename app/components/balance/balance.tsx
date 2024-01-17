import { HStack, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import getTokenContract from "../../utils/tokens";
import { getFullDisplayBalance } from "../../utils/format";
import CountUp from 'react-countup';

type BalanceProps = {
  account: string | null | undefined,
  library: any
}

const Balance: FunctionComponent<BalanceProps> = ({ account, library }) => {
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
  const [balanceBNB, setBalanceBNB] = useState("");
  const [balanceCustomToken, setBalanceCustomToken] = useState(0);

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      web3.eth.getBalance(account ? account : '').then(res => {
        setBalanceBNB(web3.utils.fromWei(res, 'ether'));
      });
    }
  }, [account]);

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      let contract: Contract | undefined = getTokenContract('ZLDKC', true);
      if (contract) {
        contract.methods.balanceOf(account).call().then((res: any) => {
          let r: number = parseFloat(getFullDisplayBalance(res, 8, 2));
          setBalanceCustomToken(r);
        });
      }
    }
  }, [account]);

  if (account == null || account == undefined || account == '') {
    return (
      <>
        <HStack>
          <Text>Balance: 0.0000 BNB</Text>
        </HStack>
        <HStack>
          <Text>CustomTokenBalance: 0.0000 ZLDKC</Text>
        </HStack>
      </>
    );
  }
  return (
    <>
      <HStack>
        <Text>Balance: </Text>
        <CountUp
          start={0}
          end={parseFloat(balanceBNB)}
          suffix=" BNB"
          duration={1}
          separator=","
          decimal="."
          decimals={4}
        />
      </HStack>
      <HStack>
        <Text>CustomTokenBalance: </Text>
        <CountUp
          start={0}
          end={balanceCustomToken}
          duration={1}
          separator=","
          suffix=" ZLDKC"
          decimal="."
          decimals={2}
        />
      </HStack>
    </>
  );
};

export default Balance;