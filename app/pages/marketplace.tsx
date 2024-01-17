import React, { useState, useEffect, useContext } from "react";
import Navbar from '../components/navbar/navbar'
import Footer from '../components/footer/footer'
import { Link, Text, Tooltip, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../components/button/button";
import BuyB2STokenModal from "../components/modals/marketplaceModals/buyB2STokenModal";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { Box, Container, Grid, GridItem, Heading, Image, Button, Flex, Spacer } from "@chakra-ui/react";
import NFT_INTERFACE3 from '../config/abi/nft3.json';
import { ethers } from "ethers";
import BuyNFTModal from "../components/modals/marketplaceModals/buyNFTModal";
import ReactGA from 'react-ga4';
import { sendGAEvent } from "../utils/utils";
import AddAllowanceModal from "../components/modals/marketplaceModals/addAllowanceModal";
import { MixPanelTracking } from "../services/mixpanel";
import { LanguageContext } from '../components/LanguageSwitcher/language';

interface NFT {
  id: string;
  name: string;
  image: string;
  price: string;
  owner: string;
  currency: string;
  currencyAddress: string;
}

export default function Marketplace() {
  const { dictionary } = useContext(LanguageContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenBuyNFTModal, onOpen: onOpenBuyNFTModal, onClose: onCloseBuyNFTModal } = useDisclosure();
  const { isOpen: isOpenAddAllowanceModal, onOpen: onOpenAddAllowanceModal, onClose: onCloseAddAllowanceModal } = useDisclosure();

  const [nftToBuyIndex, setNFTToBuyIndex] = useState<number>(0);
  const [isError, setIsError] = useState<Boolean>(false);
  const { account, library, chainId, activate, deactivate, active } = useWeb3React<Web3Provider>();

  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [nftToBuy, setNFTToBuy] = useState<NFT>({
    id: "",
    name: "",
    image: "",
    price: "",
    owner: "",
    currency: "",
    currencyAddress: "",
  });

  useEffect(() => {
    if (!library || !account) {
      return;
    }
    setIsError(false);
  }, [account, library])

  useEffect(() => {
    if (!library || !account)
      return;
    async function fetchData() {
      await fetchNFTs();
    }
    fetchData();
  }, [account, library])

  const fetchNFTs = async () => {
    if (!library || !account)
      return;
    let contractAddress: string = "0x8fE921C13825003F02F46EF261589a3bb7bc7B98"
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = _provider.getSigner();

    let contract = new ethers.Contract(contractAddress, NFT_INTERFACE3, signer);
    let res = await contract.fetchMarketItems();

    let nftArrayTmp: NFT[] = [];
    for (let i = 0; i < res.length; i++) {
      let _nftURI = res[i].tokenURI;
      let _nftPrice = res[i].price;
      let _nftName = res[i].name;
      let _nftOwner = res[i].seller;
      let _nftId = res[i].tokenId;
      let _nftCurrency = res[i].currency;
      let _nftCurrencyAddress = res[i].currencyAddress;
      let _nft = {
        id: _nftId.toString(),
        name: _nftName,
        image: _nftURI,
        price: ethers.utils.formatEther(_nftPrice),
        owner: _nftOwner,
        currency: _nftCurrency,
        currencyAddress: _nftCurrencyAddress,
      }
      nftArrayTmp.push(_nft);
    }
    setNFTs(nftArrayTmp);
  };

  const handleBuyNFT = (nft: NFT) => {
    setNFTToBuyIndex(parseInt(nft.id) - 1);
    setNFTToBuy(nft);
    onOpenBuyNFTModal();
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <div style={{ height: "100px", paddingTop: '1%' }}>
          <div style={{ float: "left", paddingLeft: '2%' }}>
            <Text fontSize="4xl" fontWeight="bold">
              Marketplace
            </Text>
          </div>
          <div style={{ float: "right", paddingRight: '2%' }}>
            <Tooltip
              label={dictionary.marketplace.tooltip_label_connect}
              isDisabled={active}
              shouldWrapChildren
              placement="left"
              hasArrow
            >
              <CustomButton
                name={dictionary.marketplace.give_allowance}
                id="buyB2ST"
                size="lg"
                variant="success"
                onClick={onOpenAddAllowanceModal}
                disabled={!active}
                gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}
                categoryGA={"Button"} labelGA={"Giving allowance"}
              />
            </Tooltip>
            <Tooltip
              label={dictionary.marketplace.tooltip_label_connect}
              isDisabled={active}
              shouldWrapChildren
              placement="left"
              hasArrow
            >
              <CustomButton
                name={dictionary.marketplace.buy_b2st}
                id="buyB2ST"
                size="lg"
                variant="success"
                onClick={onOpen}
                disabled={!active}
                gap={undefined} srcImg={undefined} alt={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}
                categoryGA={"Button"} labelGA={"Opening modal to buy B2ST"} />
            </Tooltip>
          </div>
        </div>
        <Box py={10}>
          <Container maxW="container.xl">
            <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
              {nfts.map((nft) => (
                <GridItem key={nft.id}>
                  <Tooltip
                    label={dictionary.marketplace.tooltip_label_nft_not_sale}
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
                        {dictionary.marketplace.price}: {nft.price} {nft.currency === "BNB" ? "BNB" : "B2ST"}
                        </Text>
                        <Flex align="center">
                          <Link href={`https://testnet.bscscan.com/address/${nft.owner}`} isExternal>
                            <Text
                              fontSize={"sm"}
                              fontWeight={"bold"}
                              mr={2}
                              cursor={"pointer"}
                            >
                              {dictionary.marketplace.owner}: {nft.owner.substring(0, 10)}...
                            </Text>
                          </Link>
                          <Spacer />
                          <Button
                            colorScheme="teal"
                            onClick={() => {
                              sendGAEvent('Marketplace', 'button_click', 'Buy NFT')
                              handleBuyNFT(nft)
                            }}
                            disabled={(nft.price == "0.0") ? true : false}
                          >
                            {dictionary.marketplace.buy}
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
        _nft={nftToBuy}
      />
      <AddAllowanceModal
        isOpenModal={isOpenAddAllowanceModal}
        closeModal={onCloseAddAllowanceModal}
      />
    </>
  )
}