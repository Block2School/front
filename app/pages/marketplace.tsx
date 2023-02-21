import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Text, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import BuyB2STokenModal from "../components/modals/marketplaceModals/buyB2STokenModal";

export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <CustomButton
              name="Buy B2ST"
              id="buyB2ST"
              size="lg"
              variant="success"
              onClick={onOpen}
            />
          </div>
        </div>
      </div>
      <Footer />
      <BuyB2STokenModal
        isOpen={isOpen}
        closeModal={onClose}
      />
    </>
  )
}