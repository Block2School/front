import SelectWalletModal from '../modals/wallets/walletsModal'
import { useWeb3React } from '@web3-react/core'
import { useColorModeValue, useDisclosure } from '@chakra-ui/react'
import CustomButton from '../button/button'
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
    window.sessionStorage.setItem('provider', 'undefined')
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
  }

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
        <CustomButton id='login_button' name="Connect Wallet" onClick={onOpen}/>
      ): !active && isError === true ? (
        <Tooltip label="Wrong Network" placement="top" hasArrow>
          <CustomButton id="login_mode_select" name="Connect Wallet" onClick={onOpen} srcImg="/warning-sign-svgrepo-com.svg" alt="warning"/>
        </Tooltip>
      ) : (
        <CustomButton id='login_button' name="Disconnect Wallet" onClick={disconnect}/>
      )}
      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  )
}
