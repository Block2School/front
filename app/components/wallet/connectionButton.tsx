import SelectWalletModal from '../modals/wallets/walletsModal'
import Token2FAModal from '../modals/2FA/Token2FAModal'
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
import { sendGAEvent } from '../../utils/utils'
import * as Sentry from '@sentry/react'

export default function ConnectionButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen:isOpen2, onOpen:onOpen2,onClose:onClose2 } = useDisclosure()
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()
  const [token, setToken] = useState("")
  const [isError, setIsError] = useState(false)
  // const [tokenReady, setTokenReady] = useState(false)
  const color = useColorModeValue("black", "white");

  const refreshState = () => {
    console.log('REFRESH STATE CALLED')
    window.sessionStorage.setItem('provider', 'undefined')
    window.sessionStorage.removeItem('token');
    setIsError(false)
  }

  const disconnect = () => {
    refreshState()
    deactivate()
    window.location.reload()
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
    console.log('provider: ', provider)
    if (provider) console.log('if (provider): ', provider)
    if (provider && provider !== "undefined") console.log('if (provider && provider !== "undefined"): ', provider)
    // print provider type
    console.log('typeof provider: ', typeof provider)
    if (provider && provider !== "undefined") activate(connectors[provider], handleConnection);
  }, []);

  function setTokenReady() {
    console.log('setTokenReady called');
    axios({
      method: "post",
      url: `${serverURL}:8080/login`,
      data: {
        wallet_address: account,
        encrypted_wallet: account,
        token:token
      },
    }).then((res) => {
      console.log('setTokenReady[res.data(login)]: ', res.data)
      console.log('setTokenReady[res.status(login)]: ', res.status)
      if (res.status === 200) {
        onClose2()
        sessionStorage.setItem('token', res.data.access_token)
      }
    })
  }

  useEffect(() => {
    console.log('[connection ?] active: ', active)
    console.log('[connection ?] account: ', account)
    if (active === true) {
      axios({
        method: 'post',
        url: `${serverURL}:8080/login`,
        data: {
          wallet_address: account,
          encrypted_wallet: account,
          token:token,
        },
      }).then((res) => {
        console.log('login(useEffect): ', res.data)
        if (res.status === 200) {
          Sentry.setUser({
            username: account || "",
          })
          sessionStorage.setItem('token', res.data.access_token)
        }
      }).catch((res) => {
        console.log('login catch(useEffect): ', res)
          if (res.response.status === 401 && sessionStorage.getItem("token") == null) {
            onOpen2()
          }
        }
      )
    }
  }, [active])

  return (
    <>
      {!active && isError === false ? (
        <CustomButton id='login_button' name="Connect Wallet" onClick={onOpen} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} categoryGA={'Connection Button'} labelGA={'Open Connect wallet modal'} />
      ) : !active && isError === true ? (
        <Tooltip label="Wrong Network" placement="bottom" hasArrow>
          {/* <CustomButton id="login_button" name="Connect Wallet" onClick={onOpen} srcImg="/warning-sign-svgrepo-com.svg" alt="warning" gap={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined}/> */}
          <Button id='login_button' size='md' variant='outline' onClick={() => { sendGAEvent('Connection Button', 'button_click', 'Connect Wallet Wrong Network'); onOpen() }}>
            <HStack color={color}>
              <Image src="/warning-sign-svgrepo-com.svg" alt="warning" />
              <Text>Connect Wallet</Text>
            </HStack>
          </Button>
          {/* <CustomButtonRef id='login_button' name="Connect Wallet" onClick={onOpen} srcImg="/warning-sign-svgrepo-com.svg" alt="warning" size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} gap={undefined}/> */}
        </Tooltip>
      ) : (
        <CustomButton id='login_button' name="Disconnect Wallet" onClick={disconnect} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} categoryGA={'Connection Button'} labelGA={'Disconnect Wallet'} />
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
      <Token2FAModal isOpen={isOpen2} closeModal={onClose2} setToken={setToken} setTokenReady={setTokenReady}/>
    </>
  )
}
