import SelectWalletModal from "../modals/wallets/walletsModal";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../wallet/injectors";
import { Button, HStack, Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Tooltip } from '@chakra-ui/react';

export default function ConnectionButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active } = useWeb3React();
  const [ isError, setIsError ] = useState(false);

  const refreshState = () => {
    window.localStorage.setItem("provider", "undefined");
    setIsError(false);
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  };

  const handleConnection = async (error: Error): Promise<void> => {
    console.log("error: ", error);
    console.log("error.name: ", error.name);
    if (error.name === "UnsupportedChainIdError") {
      // display warning
      console.log("UnsupportedChainIdError");
      setIsError(true);
    }
  }

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider], handleConnection);
  });

  return (
    <>
      <HStack>
        {!active && isError === false ? (
          <Button onClick={onOpen} background="rgb(53, 53, 71)" _hover={{ bg: 'rgb(77 77 86)' }} _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }} color="white">Connect Wallet</Button>
        ): !active && isError === true ? (
          <Tooltip label="Wrong Network" placement="top" hasArrow>
            <Button onClick={onOpen} background="rgb(53, 53, 71)" _hover={{ bg: 'rgb(77 77 86)' }} _focus={{
              boxShadow:
                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
            }} color="white"><Image
              src="/warning-sign-svgrepo-com.svg"
              alt="warning"
              height="50%"
              width="50%"
              paddingRight={2}
            />Connect Wallet</Button>
          </Tooltip>
        ) : (
          <Button onClick={disconnect} background="rgb(53, 53, 71)" _hover={{ bg: 'rgb(77 77 86)' }} _focus={{
            boxShadow:
              '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
          }} color="white">Disconnect Wallet</Button>
        )}
      </HStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  );
}