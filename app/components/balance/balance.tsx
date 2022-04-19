import useSWR from "swr";
import fetcher from "../swr/srwWrapper";
import { HStack, Text } from "@chakra-ui/react";
import { formatEther } from "ethers/lib/utils";
import { FunctionComponent, useEffect, useState } from "react";
import Web3 from "web3";

// const Balance = (account: string | null | undefined, library: any) => {
//   const { data: balance } = useSWR(['getBalance', account, 'latest'], {
//     fetcher: fetcher(library)
//   });

//   if (!balance) {
//     return <Text>...</Text>
//   }

//   // return <div>Balance: {Balance.toString()}</div>
//   return (
//     <HStack>
//       <Text>Balance: {parseFloat(formatEther(balance)).toPrecision(4)}</Text>
//     </HStack>
//   )
// }

type BalanceProps = {
  account: string | null | undefined,
  library: any
}

// const Balance: FunctionComponent<BalanceProps> = ({account, library}) => {
//   const { data: balance } = useSWR([account, 'bnbBalance', 'latest'], {
//     fetcher: fetcher(library)
//   });
//   console.log('account', account)
//   console.log('library', library)
//   console.log('balance == ', balance);
//   if (!balance) {
//     return <Text>...</Text>
//   }

//   // return <div>Balance: {Balance.toString()}</div>
//   return (
//     <HStack>
//       <Text>Balance: {parseFloat(formatEther(balance)).toPrecision(4)}</Text>
//     </HStack>
//   );
// };

const Balance: FunctionComponent<BalanceProps> = ({account, library}) => {
  // const { status, data, mutate } = useSWR([account, 'bnbBalance'], async () => {
  //   return await library.getBalance(account);
  // });
  // console.log('account', account)
  // console.log('library', library)
  // console.log('balance == ', balance);
  // if (!balance) {
  //   return <Text>...</Text>
  // }
  // let test = wen3
  // return <div>Balance: {Balance.toString()}</div>
  // const web3 = new Web3('https://bsc-dataseed1.binance.org:443'); // MAINNET
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545'); // TESTNET
  const [balance, setBalance] = useState("");

  useEffect(() => {
    if (account !== "" && account !== undefined && account !== null) {
      web3.eth.getBalance(account ? account : '').then(res => {
        setBalance(web3.utils.fromWei(res, 'ether'));
      });
    }
  }, [account]);
  
  if (account == null || account == undefined || account == '') {
    return (
      <HStack>
        <Text>Balance: 0.0000 BNB</Text>
      </HStack>
    );
  }
  return (
    <HStack>
      <Text>Balance: {balance} BNB</Text>
    </HStack>
  );
};

export default Balance;