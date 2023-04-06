import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import BuyB2STokenModal from "../components/modals/marketplaceModals/buyB2STokenModal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Box, Container, Grid, GridItem, Heading, Image, Button, Flex, Spacer } from "@chakra-ui/react";

interface NFT {
  id: string;
  name: string;
  image: string;
  price: number;
}

export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { active } = useWeb3React<Web3Provider>();
  const [nfts, setNFTs] = useState<NFT[]>([{
    id: "1",
    name: "B2ST",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  }, {
    id: "2",
    name: "B2ST2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  }, {
    id: "3",
    name: "B2ST3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  },{
    id: "4",
    name: "B2ST4",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  },{
    id: "5",
    name: "B2ST5",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  },{
    id: "6",
    name: "B2ST6",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
    price: 1,
  }]);

  const handleBuyNFT = (nft: NFT) => {
    console.log(nft);
  };

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
                gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
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
        <Box py={10}>
          <Container maxW="container.xl">
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
              {nfts.map((nft) => (
                <GridItem key={nft.id}>
                  <Box borderWidth={1} borderRadius="md" overflow="hidden">
                    <Image src={nft.image} alt={nft.name} w="100%" h={300} objectFit="cover" />
                    <Box p={4}>
                      <Heading as="h2" size="md" mb={2}>
                        {nft.name}
                      </Heading>
                      <Text fontSize="xl" fontWeight="bold" mb={2}>
                        Price: {nft.price} B2ST
                      </Text>
                      <Flex align="center">
                        <Spacer />
                        <Button colorScheme="teal" onClick={() => handleBuyNFT(nft)}>
                          Buy
                        </Button>
                      </Flex>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Container>
        </Box>
      </div>
      <Footer />
      <BuyB2STokenModal
        isOpenModal={isOpen}
        closeModal={onClose}
      />
    </>
  )
}