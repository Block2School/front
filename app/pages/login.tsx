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
import LoginTitle from "../components/login/loginTitle";
import LoginInformation from "../components/login/loginInformation";

const Login: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active }=useWeb3React();
  const [signature, setSignature] = useState("");
  const [network, setNetwork] = useState(undefined);
  const [message, setMessage] = useState("");
  const [verified, setVerified] = useState();

  const refreshState = () => {
    window.sessionStorage.setItem("provider", "undefined");
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
    const provider = window.sessionStorage.getItem("provider");
    console.log('provider2: ', provider)
    if (provider) activate(connectors[provider], handleConnection);
  });

  return (
    <>
      <Navbar />
      <VStack justifyContent="center" alignItems="center" h="100vh">
        <LoginTitle/>
        <LoginInformation
          account={account}
          library={library}
          chainId={chainId}
          active={active}
          onOpen={onOpen}
          disconnect={disconnect}/>
      </VStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
      <Footer />
    </>
  );
};

export default Login;
