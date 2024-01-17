import { VStack } from "@chakra-ui/react"
import { useWeb3React } from '@web3-react/core'
import CustomButton from "../../button/button"
import { connectors } from '../../wallet/injectors'

export default function LoginOptions({ isOpen, closeModal}: { isOpen: boolean, closeModal: any}) {

  const { activate } = useWeb3React()

  const setProvider = (type: any) => {
    window.sessionStorage.setItem('provider', type)
  }

  return (
    <VStack>
      <CustomButton id='coinbase' srcImg="/coinbase_wallet_appicon.svg" alt="Coinbase Wallet Logo" wImg={25} hImg={25} gap={3} name="Coinbase Wallet" variant="outline" borderRadius="3px" onClick={() => {
        activate(connectors.coinbaseWallet)
        setProvider('coinbaseWallet')
        { isOpen = false}
        closeModal()
      }} size={undefined} disabled={undefined} categoryGA={"Button"} labelGA={"Coinbase Wallet Connection"} />
      <CustomButton name="MetaMask" id="metamask"
        variant="outline"
        onClick={() => {
          activate(connectors.injected)
          setProvider('injected')
          { isOpen = false}
          closeModal()
        }} srcImg="/metamask_appicon.svg" alt="MetaMask Logo" wImg={25} hImg={25} gap={3} size={undefined} disabled={undefined} borderRadius={undefined} categoryGA={"Button"} labelGA={"Metamask connection"} />
      <CustomButton name="Binance Wallet" id="binance" variant="outline"
        onClick={() => {
          activate(connectors.binanceWallet)
          setProvider('binanceWallet')
          { isOpen = false}
          closeModal()
        }} srcImg="/binance_wallet_appicon.svg" alt="Binance Wallet Logo" wImg={25} hImg={25} gap={3} size={undefined} disabled={undefined} borderRadius={undefined} categoryGA={"Button"} labelGA={"Binance Wallet connection"} />
    </VStack>
  )
}