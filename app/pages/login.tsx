import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { VStack, useDisclosure, Button, Text, HStack } from "@chakra-ui/react";

import SelectWalletModal from "../components/modals/wallets/walletsModal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../components/wallet/injectors";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Balance from "../components/balance/balance";
import Web3 from "web3";

const Login: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active } =
    useWeb3React();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const refreshState = () => {
    window.localStorage.setItem("provider", "undefined");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  const handleConnection = async (error: Error): Promise<void> => {
    console.log('error: ', error);
    console.log('error.name: ', error.name);
    if (error.name === 'UnsupportedChainIdError') {
      // display warning
    }
  }

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider], handleConnection);
  });

  return (
    <>
      <Navbar />
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <HStack marginBottom="10px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          >
            Lets connect with
          </Text>
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Web3-React
          </Text>
        </HStack>
        <HStack>
          {!active ? (
            <Button onClick={onOpen}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </HStack>
        <VStack justifyContent="center" alignItems="center" padding="10px 0">
          <HStack>
            <Text>{`Connection Status: `}</Text>
            {active ? (
              <CheckCircleIcon color="green" />
            ) : (
              <WarningIcon color="#cd5700" />
            )}
          </HStack>
          <HStack>
            <Text>{`Account: `}</Text>
            {active ? (
              <Text>{account}</Text>
            ) : (
              <Text>{`Not Connected`}</Text>
            )}
          </HStack>
          <HStack>
            <Text>{`Network: `}</Text>
            {active ? (
              <Text>{chainId}</Text>
            ) : (
              <Text>{`Not Connected`}</Text>
            )}
          </HStack>
          <HStack>
            <Text>{`Library: `}</Text>
            {active ? (
              <Text>{library.name}</Text>
            ) : (
              <Text>{`Not Connected`}</Text>
            )}
          </HStack>
          <HStack>
            {active ? (
              <Text>{'0.00'} BNB</Text>
            ) : (
              <Text>0.00 BNB</Text>
            )}
          </HStack>
          {/* <Balance {account: account, library: library}/>{} */}
          <Balance account={account} library={library} />
        </VStack>
      </VStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      <Footer />
    </>
  );
};

export default Login;
