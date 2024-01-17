import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import NFT_INTERFACE3 from '../../config/abi/nft3.json';
import React, { useEffect, useContext } from 'react'
import { Text, Image, Center, Heading, Button, Flex, Link, Spacer, useDisclosure } from '@chakra-ui/react';
import MyNFTModal from '../modals/myNFTModal/myNFTModal';
import { sendGAEvent } from '../../utils/utils';
import { LanguageContext } from '../LanguageSwitcher/language';

export default function UserNFTView() {
  const [userNFT, setUserNFT] = React.useState<any>([]);
  const { account, library, chainId, activate, deactivate, active } = useWeb3React();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nftToResell, setNFTToResell] = React.useState<any>({});
  const [listingPrice, setListingPrice] = React.useState<string>('');
  const { dictionary } = React.useContext(LanguageContext);

  useEffect(() => {
    if (!library || !account) return;
    async function fetchUserNFTs() {
      await fetchUserNFT();
    }
    fetchUserNFTs();
  }, [account, library]);

  const fetchUserNFT = async () => {
    if (!library || !account) return;
    const contractAddress: string = "0x8fE921C13825003F02F46EF261589a3bb7bc7B98";
    const _provider = new ethers.providers.Web3Provider(library?.provider);
    const signer = _provider.getSigner();

    let contract = new ethers.Contract(contractAddress, NFT_INTERFACE3, signer);
    let res = await contract.fetchMyNFTs();

    let nftArrayTmp: any[] = [];
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

    let res2 = await contract.getListingPrice();
    setListingPrice(ethers.utils.formatEther(res2));
    setUserNFT(nftArrayTmp);
  };

  if (userNFT.length === 0) return null;

  return (
    <>
      <div>
        <Center>
          <Text fontSize="2xl" fontWeight="bold">{dictionary.user_nft.my_nft}</Text>
        </Center>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            overflowX: 'scroll',
            overflowY: 'hidden',
            whiteSpace: 'nowrap',
            paddingLeft: '2%',
            paddingBottom: '2%',
          }}
        >
          <Center>
            <Flex>
              {userNFT.map((nft: any) => (
                <Flex direction="column" key={nft.id} m={2} width={'sm'}>
                  <Center>
                    <Image src={nft.image} alt="nft" width="300px" height="300px" />
                  </Center>
                  <Text>{nft.name}</Text>
                  <Text>{nft.price} {nft.currency === "BNB" ? "BNB" : "B2ST"}</Text>
                  <Text>{nft.id}</Text>
                  <Center>
                    <Button
                      onClick={() => {
                        sendGAEvent('UserNFT', 'button_click', 'Resell NFT Modal Opening');
                        setNFTToResell(nft);
                        onOpen();
                      }}
                      colorScheme="teal"
                      variant="outline"
                    >
                      {dictionary.user_nft.resell}
                    </Button>
                  </Center>
                </Flex>
              ))}
            </Flex>
          </Center>
        </div>
      </div>
      <MyNFTModal
        isOpenModal={isOpen}
        closeModal={onClose}
        _nft={nftToResell}
        listingPrice={listingPrice}
      />
    </>
  );
}

