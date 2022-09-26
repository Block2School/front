import SelectWalletModal from '../modals/wallets/walletsModal'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../wallet/injectors'
import { Button, HStack, Image, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Tooltip } from '@chakra-ui/react'
import axios from 'axios'
import { serverURL } from '../../utils/globals'

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

  const refreshState = () => {
    window.localStorage.setItem('provider', 'undefined')
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
      // display warning
      console.log('UnsupportedChainIdError')
      setIsError(true)
    }
  }

  useEffect(() => {
    // console.log('NIQUE TA MERE ACTIVATE == ', active);
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
      // console.log('acocunt == ', account);
    }
  }, [active])

  useEffect(() => {
    const provider = window.localStorage.getItem('provider')
    // @ts-ignore
    if (provider) activate(connectors[provider], handleConnection)
    // console.log('hi there');
  })

  return (
    <>
      <HStack id="connectionButton">
        {!active && isError === false ? (
          <Button id='login_button' onClick={onOpen} className="CONNECT_WALLET">Connect Wallet</Button>
        ): !active && isError === true ? (
          <Tooltip label="Wrong Network" placement="top" hasArrow>
            <Button id='login_mode_select' onClick={onOpen} color="white"><Image
              src="/warning-sign-svgrepo-com.svg"
              alt="warning"
              paddingRight={2}
            />Connect Wallet</Button>
          </Tooltip>
        ) : (
          <Button onClick={disconnect}>Disconnect Wallet</Button>
        )}
      </HStack>
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  )
}
