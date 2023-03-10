import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import BuyB2STokenModal from "../components/modals/marketplaceModals/buyB2STokenModal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active } = useWeb3React<Web3Provider>();

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        {/* header with the title */}
        <div style={{ height: "100px", paddingTop: '1%' }}>
          {/* place both content on opposite side */}
          <div style={{ float: "left", paddingLeft: '2%' }}>
            <Text
              fontSize="4xl"
              fontWeight="bold"
            >
              Marketplace
            </Text>
          </div>
          <div style={{ float: "right", paddingRight: '2%' }}>
            <Tooltip
              label='Please connect to your wallet first !'
              isDisabled={active}
              shouldWrapChildren
              placement="left"
              hasArrow
            >
              <CustomButton
                name="Buy B2ST"
                id="buyB2ST"
                size="lg"
                variant="success"
                onClick={onOpen}
                disabled={!active}
                gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}              />
            </Tooltip>
            {/* <CustomButton
              name="Buy B2ST"
              id="buyB2ST"
              size="lg"
              variant="success"
              onClick={onOpen}
              disabled={!active}
            /> */}
          </div>
        </div>
      </div>
      <Footer />
      <BuyB2STokenModal
        isOpenModal={isOpen}
        closeModal={onClose}
      />
    </>
  )
}