import Link from 'next/link'
import Image from 'next/image'

import SelectWalletModal from '../modals/wallets/walletsModal'
import Balance from '../balance/balance'
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../wallet/injectors'
import { useEffect, useContext, useState } from 'react'
import ConnectionButton from '../wallet/connectionButton'
import NavbarAllBalances from '../wallet/navbarAllBalances'
import { ThemeSelector } from '../themeSelector/themeSelector'
import { LanguageContext, LanguageSwitcher } from "../LanguageSwitcher/language";
import { BiUser } from 'react-icons/bi'

export default function Navbar() {

  const { dictionary } = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);


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

  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

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
            <Image id='navbar-logo' src="/Logo_B2S.png" alt="logo" height="50" width="50" />
            <Link  href={'/'} passHref>
              <span className="navbar-text-logo">Block2School</span>
            </Link>
          </div>
          <div id="navbar-links-container">
            <div id="navbar-links-main">
              <Link href={'/tutorials'} passHref>
                <span className="navbar-text">{dictionary.navbar.tutorials}</span>
              </Link>
              <Link href={'/challenges'} passHref>
                <span className="navbar-text">Challenges</span>
              </Link>
              <Link href={'/faq'} passHref>
                <span className="navbar-text">FAQ</span>
              </Link>
              {/* <Link href={'/login'} passHref>
                <span className="navbar-text">Login</span>
              </Link> */}
              <Link href={'/blog'} passHref>
                <span className="navbar-text">Blog</span>
              </Link>
              <Link href={'/marketplace'} passHref>
                <span className="navbar-text">Marketplace</span>
              </Link>
            </div>
          </div>
          <div id="navbar-mobile-part">
            <NavbarAllBalances />
            {
              active === true ?
                <Link href={'/profile'} passHref>
                  <BiUser
                    size={"13%"}
                    color={"white"}
                    style={{ padding: '15px', cursor: 'pointer',}}

                  />
                </Link>
                :
                null
            }
            <ConnectionButton />
            <ThemeSelector />
            <LanguageSwitcher />
          </div>
        </div>
        <button className="navbar-menu-button" onClick={handleToggleModal}>
                ☰
            </button>
      </div>

        {/* Modal to display the navigation links */}
        {showModal && (
        <div className="navbar-modal">
          <div className="navbar-modal-content">
            <div className="navbar-modal-close" onClick={handleToggleModal}>
              &times;
            </div>
            <div className="navbar-modal-links">
              <Link href={'/tutorials'} passHref>
                <span className="navbar-modal-text">{dictionary.navbar.tutorials}</span>
              </Link>
              <Link href={'/challenges'} passHref>
                <span className="navbar-modal-text">Challenges</span>
              </Link>
              <Link href={'/faq'} passHref>
                <span className="navbar-modal-text">FAQ</span>
              </Link>
              <Link href={'/profile'} passHref>
                <span className="navbar-modal-text">My Profile</span>
              </Link>
              <Link href={'/blog'} passHref>
                <span className="navbar-modal-text">Blog</span>
              </Link>
              <ConnectionButton/>
              </div>
          </div>
        </div>
      )}
    </>
  )
}
