import SelectWalletModal from '../modals/wallets/walletsModal'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Button, useColorModeValue, useDisclosure, Text, HStack } from '@chakra-ui/react'
import CustomButton from '../button/button'
import { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import { connectors } from './injectors'
import { Image } from 'react-bootstrap'
import CustomButtonRef from '../button/buttonRef'

export default function ConnectionButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()
  const [isError, setIsError] = useState(false)
  const color = useColorModeValue("black", "white");

  const refreshState = () => {
    window.sessionStorage.setItem('provider', 'undefined')
    window.sessionStorage.removeItem('token');
    setIsError(false)
  }

  const disconnect = () => {
    refreshState()
    deactivate()
  }

  const handleConnection = async (error: Error): Promise<void> => {
    console.log('error: ', error)
    console.log('error.name: ', error.name)
    if (error.name === 'UnsupportedChainIdError') {
      console.log('UnsupportedChainIdError')
      setIsError(true)
    }
    if (error instanceof UnsupportedChainIdError) {
      console.log('UnsupportedChainIdError 2')
      setIsError(true)
    }
  }

  useEffect(() => {
    const provider = window.sessionStorage.getItem("provider");
    if (provider) activate(connectors[provider], handleConnection);
  }, []);

  useEffect(() => {
    if (active === true) {
      axios({
        method: 'post',
        url: `${serverURL}:8080/login`,
        data: {
          wallet_address: account,
          encrypted_wallet: account,
        },
      }).then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('token', res.data.access_token)
        }
      })
    }
  }, [active])

  return (
    <>
      {!active && isError === false ? (
        <CustomButton id='login_button' name="Connect Wallet" onClick={onOpen} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
      ) : !active && isError === true ? (
        <Tooltip label="Wrong Network" placement="bottom" hasArrow>
          {/* <CustomButton id="login_button" name="Connect Wallet" onClick={onOpen} srcImg="/warning-sign-svgrepo-com.svg" alt="warning" gap={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}/> */}
          <Button id='login_button' size='md' variant='outline' onClick={onOpen}>
            <HStack color={color}>
              <Image src="/warning-sign-svgrepo-com.svg" alt="warning" />
              <Text>Connect Wallet</Text>
            </HStack>
          </Button>
          {/* <CustomButtonRef id='login_button' name="Connect Wallet" onClick={onOpen} srcImg="/warning-sign-svgrepo-com.svg" alt="warning" size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} gap={undefined}/> */}
        </Tooltip>
      ) : (
        <CustomButton id='login_button' name="Disconnect Wallet" onClick={disconnect} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} />
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  )
}
