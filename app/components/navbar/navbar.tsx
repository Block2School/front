import Link from 'next/link'
import Image from 'next/image'

import SelectWalletModal from '../modals/wallets/walletsModal'
import Balance from '../balance/balance'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../wallet/injectors'
import { useEffect, useContext } from 'react'
import ConnectionButton from '../wallet/connectionButton'
import NavbarAllBalances from '../wallet/navbarAllBalances'
import { LanguageContext, LanguageSwitcher } from "../LanguageSwitcher/language";

export default function Navbar() {

  const { dictionary } = useContext(LanguageContext);

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()

  const refreshState = () => {
    window.sessionStorage.setItem('provider', 'undefined')
  }

  const disconnect = () => {
    refreshState()
    deactivate()
  }

  const handleConnection = async (error: Error): Promise<void> => {
    if (error.name === 'UnsupportedChainIdError') {
      // display warning
      console.log('ERROR WRONG CHAIN')
    }
  }

  useEffect(() => {
    const provider = window.sessionStorage.getItem('provider')
    // @ts-ignore
    console.log('here')
    console.log('provider == ', provider)
    if (provider) activate(connectors[provider], handleConnection)
  }, [])

  return (
    <>
      <div id="navbar-component">
        <div id="navbar-container">
          <div id="navbar-logo-container">
            <Image src="/B2S_white.png" alt="logo" height="100%" width="100%" />
            <Link href={'/'} passHref>
              <span className="navbar-text">Block2School</span>
            </Link>
          </div>
          <div id="navbar-links-container">
            <div id="navbar-links-main">
              <Link href={'/faq'} passHref>
                <span className="navbar-text">FAQ</span>
              </Link>
              <Link href={'/login'} passHref>
                <span className="navbar-text">{dictionary.navbar.login}</span>
              </Link>
              <Link href={'/tutorials'} passHref>
                <span className="navbar-text">{dictionary.navbar.tutorials}</span>
              </Link>
              <Link href={'/blog'} passHref>
                <span className="navbar-text">Blog</span>
              </Link>
            </div>
          </div>
            <NavbarAllBalances/>
            <ConnectionButton/>
            <LanguageSwitcher/>
        </div>
      </div>
    </>
  )
}
