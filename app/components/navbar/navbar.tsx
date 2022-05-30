import Link from "next/link";
import Image from "next/image";
import * as logoWhite from "/public/B2S_white.png";

import SelectWalletModal from "../modals/wallets/walletsModal";
import Balance from "../balance/balance";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "../wallet/injectors";
import { Button, HStack, useDisclosure } from "@chakra-ui/react";
import { useEffect } from "react";
import ConnectionButton from "../wallet/connectionButton";
import NavbarBalance from "../wallet/navbarBalance";

export default function Navbar() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { library, chainId, account, activate, deactivate, active } = useWeb3React();

  const refreshState = () => {
    window.localStorage.setItem("provider", "undefined");
  };

  const disconnect = () => {
    refreshState();
    deactivate();
  }

  const handleConnection = async (error: Error): Promise<void> => {
    if (error.name === 'UnsupportedChainIdError') {
      // display warning
      console.log('ERROR WRONG CHAIN')
    }
  }

  useEffect(() => {
    const provider = window.localStorage.getItem("provider");
    if (provider) activate(connectors[provider], handleConnection);
  });

  return (
    <>
      <div id="navbar-component">
        <div id="navbar-container">
          <div id="navbar-logo-container">
            <Image src={logoWhite} alt="logo" height="100%" width="100%" />
            <div style={{ cursor: "default" }} className="navbar-text">
              Block2School
            </div>
          </div>
          <div id="navbar-links-container">
            <div id="navbar-links-main">
              <Link href={"/"} passHref>
                <span className="navbar-text">Home</span>
              </Link>
              <Link href={"/faq"} passHref>
                <span className="navbar-text">FAQ</span>
              </Link>
              <Link href={"/login"} passHref>
                <span className="navbar-text">Login</span>
              </Link>
              <Link href={'/tutorials'} passHref>
                <span className="navbar-text">Tutorials</span>
              </Link>
              {/* <Link href={{
                pathname: "/tutorial",
                query: {
                  tutorialId: 2
                }
              }} passHref>
                <span className="navbar-text">Tutorial</span>
              </Link> */}
            </div>
          </div>
          <div className="navbar-login-button">
            <HStack>
              <NavbarBalance />
              <ConnectionButton />
            </HStack>
          </div>
        </div>
      </div>
    </>
  );
}
