import SelectWalletModal from '../modals/wallets/walletsModal'
import Token2FAModal from '../modals/2FA/Token2FAModal'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Button, useColorModeValue, useDisclosure, Text, HStack } from '@chakra-ui/react'
import CustomButton from '../button/button'
import { useEffect, useState, useContext } from 'react'
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import { connectors } from './injectors'
import { Image } from 'react-bootstrap'
import CustomButtonRef from '../button/buttonRef'
import { sendGAEvent } from '../../utils/utils'
import * as Sentry from '@sentry/react'
import { LanguageContext } from '../LanguageSwitcher/language'

export default function ConnectionButton() {
  const { dictionary } = useContext(LanguageContext);
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
  const color = useColorModeValue("black", "white");

  const refreshState = () => {
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
    if (error.name === 'UnsupportedChainIdError') {
      setIsError(true)
    }
    if (error instanceof UnsupportedChainIdError) {
      setIsError(true)
    }
  }

  useEffect(() => {
    const provider = window.sessionStorage.getItem("provider");
    if (provider && provider !== "undefined") activate(connectors[provider], handleConnection);
  }, []);

  function setTokenReady() {
    axios({
      method: "post",
      url: `${serverURL}:8080/login`,
      data: {
        wallet_address: account,
        encrypted_wallet: account,
        token:token
      },
    }).then((res) => {
      if (res.status === 200) {
        onClose2()
        sessionStorage.setItem('token', res.data.access_token)
        window.location.reload()
      }
    })
  }

  useEffect(() => {

    const _token = sessionStorage.getItem('token')
    if (_token) return;

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
        if (res.status === 200) {
          Sentry.setUser({
            username: account || "",
          })
          sessionStorage.setItem('token', res.data.access_token)
          window.location.reload()
        }
      }).catch((res) => {
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
        <CustomButton id='login_button' name={dictionary.wallet.connect_wallet} onClick={onOpen} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} categoryGA={'Connection Button'} labelGA={'Open Connect wallet modal'} />
      ) : !active && isError === true ? (
        <Tooltip label={dictionary.wallet.wrong_network} placement="bottom" hasArrow>
          <Button id='login_button' size='md' variant='outline' onClick={() => { sendGAEvent('Connection Button', 'button_click', 'Connect Wallet Wrong Network'); onOpen() }}>
            <HStack color={color}>
              <Image src="/warning-sign-svgrepo-com.svg" alt="warning" />
              <Text>{dictionary.wallet.connect_wallet}</Text>
            </HStack>
          </Button>
          </Tooltip>
      ) : (
        <CustomButton id='login_button' name={dictionary.wallet.disconnect_wallet} onClick={disconnect} gap={undefined} srcImg={undefined} alt={undefined} size={undefined} disabled={undefined} variant={undefined} hImg={undefined} wImg={undefined} borderRadius={undefined} categoryGA={'Connection Button'} labelGA={'Disconnect Wallet'} />
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose}/>
      <Token2FAModal isOpen={isOpen2} closeModal={onClose2} setToken={setToken} setTokenReady={setTokenReady}/>
    </>
  )
}
