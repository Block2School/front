import React, { useState, useEffect } from "react";
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Link, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import BuyB2STokenModal from "../components/modals/marketplaceModals/buyB2STokenModal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Box, Container, Grid, GridItem, Heading, Image, Button, Flex, Spacer } from "@chakra-ui/react";
import Web3 from "web3";
import NFT_INTERFACE from '../config/abi/nft.json';
import NFT_INTERFACE2 from '../config/abi/nft2.json';
import { ethers } from "ethers";
import BuyNFTModal from "../components/modals/marketplaceModals/buyNFTModal";

interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
  owner: string;
}

export default function Marketplace() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // get a second isOpen, onOpen, onClose
  const { isOpen: isOpenBuyNFTModal, onOpen: onOpenBuyNFTModal, onClose: onCloseBuyNFTModal } = useDisclosure();

  const [nftToBuyIndex, setNFTToBuyIndex] = useState<number>(0);
  const [isError, setIsError] = useState<Boolean>(false);
  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();
  // const [nfts, setNFTs] = useState<NFT[]>([{
  //   id: "1",
  //   name: "B2ST",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
  //   price: 1,
  // }, {
  //   id: "2",
  //   name: "B2ST2",
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2nG24AYDm6FOEC7jIfgubO96GbRso2Xshu1f8abSYQ&s",
  //   price: 1,
  // }, {
  //   id: "3",
  //   name: "B2ST3",
  //   image: "https://s2.dmcdn.net/v/UXVFb1ZjBTr7NcEaF/x1080",
  //   price: 1,
  // }]);
  const [nfts, setNFTs] = useState<NFT[]>([]);

  useEffect(() => {
    console.log('library: ', library)
    // setIsError(false);
    console.log('account: ', account)
    if (!library || !account) {
      console.log('library: ', library, 'account: ', account, "not connected")
      // setErrorMessage('Please connect to your wallet first !')
      // setIsError(true);
      // onOpen();
      return;
    }
    setIsError(false);
    // onClose();
  }, [account, library])

  useEffect(() => {
    if (!library || !account)
      return;
    console.log('JE SUIS ICI GROS CONNARD DE MERDE')
    async function fetchData() {
      await fetchNFTs();
    }
    fetchData();
  }, [account, library])

  const fetchNFTs = async () => {
    if (!library || !account)
      return;
    console.log('salut')
    console.log('library.provider: ', library?.provider)
    // let contractAddress: string = "0x814ed598FBBcD0AA466f1a0aAEE8603Ae55b96D3"
    let contractAddress: string = "0xe06855c206CE89A23b480246Cbc208c5A6deAAF8"
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = _provider.getSigner();

    // let contract = new ethers.Contract(contractAddress, NFT_INTERFACE, signer);
    let contract = new ethers.Contract(contractAddress, NFT_INTERFACE2, signer);
    let res = await contract.fetchMarketItems();
    // console.log('res: ', res)
    // console.log('res[0]: ', res[0])
    // console.log('res[0][0]: ', res[0][0])
    // console.log('res[0].name: ', res[0].name)
    // console.log('res[0].price: ', res[0].price)
    // console.log('res[0].tokenId: ', res[0].tokenId)
    // console.log('res[0].seller: ', res[0].seller)
    // console.log('res[0].tokenURI: ', res[0].tokenURI)

    for (let i = 0; i < res.length; i++) {
      let _nftURI = res[i].tokenURI;
      let _nftPrice = res[i].price;
      let _nftName = res[i].name;
      let _nftOwner = res[i].seller;
      let _nftId = res[i].tokenId;
      let _nft = {
        id: _nftId.toString(),
        name: _nftName,
        image: _nftURI,
        price: ethers.utils.formatEther(_nftPrice),
        owner: _nftOwner,
      }
      setNFTs(prevState => [...prevState, _nft]);
    }
  };

  const handleBuyNFT = (nft: NFT) => {
    console.log(nft);
    // let contract = "0x814ed598FBBcD0AA466f1a0aAEE8603Ae55b96D3";
    setNFTToBuyIndex(parseInt(nft.id) - 1);
    onOpenBuyNFTModal();
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        {/* header with the title */}
        <div style={{ height: "100px", paddingTop: '1%' }}>
          {/* place both content on opposite side */}
          <div style={{ float: "left", paddingLeft: '2%' }}>
            <Text fontSize="4xl" fontWeight="bold">
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
          </div>
        </div>
        <Box py={10}>
          <Container maxW="container.xl">
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
              {nfts.map((nft) => (
                <GridItem key={nft.id}>
                  <Tooltip
                    label="This NFT is not for sale"
                    isDisabled={(nft.price == "0.0") ? false : true}
                    shouldWrapChildren
                    placement="top"
                    hasArrow
                  >
                    <Box borderWidth={1} borderRadius="md" overflow="hidden" opacity={(nft.price == "0.0") ? "60%" : "100%"}>
                      <Image src={nft.image} alt={nft.name} w="100%" h={400} objectFit="cover" />
                      <Box p={4}>
                        <Heading as="h2" size="md" mb={2}>
                          {nft.name}
                        </Heading>
                        <Text fontSize="l" fontWeight="bold" mb={2}>
                          Price: {nft.price} BNB
                        </Text>
                        <Flex align="center">
                          <Link href={`https://testnet.bscscan.com/address/${nft.owner}`} isExternal>
                            <Text
                              fontSize={"sm"}
                              fontWeight={"bold"}
                              mr={2}
                              cursor={"pointer"}
                            >
                              Owner: {nft.owner.substring(0, 10)}...
                            </Text>
                          </Link>
                          <Spacer />
                          <Button colorScheme="teal" onClick={() => handleBuyNFT(nft)} disabled={(nft.price == "0.0") ? true : false}>
                            Buy
                          </Button>
                        </Flex>
                      </Box>
                    </Box>
                  </Tooltip>
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
      <BuyNFTModal
        isOpenModal={isOpenBuyNFTModal}
        closeModal={onCloseBuyNFTModal}
        _nft={nfts[nftToBuyIndex]}
      />
    </>
  )
}