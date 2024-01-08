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
  const [showCodeHereModal, setCodeHereModal] = useState(false)
  const [showCommunityModal, setCommunityModal] = useState(false)
  const [showInformationModal, setInformationModal] = useState(false)
  const [active, setActiveyar] = useState(true)


  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    // active,
  } = useWeb3React()

  const refreshState = () => {
    window.sessionStorage.setItem('provider', 'undefined')
  }

  const toggleCodeHereModal = () => {
    setCodeHereModal(true);
  }

  const toggleCodeHereModalLeave = () => {
    setCodeHereModal(false);
  }

  const toggleCommunityModal = () => {
    setCommunityModal(true);
  }

  const toggleCommunityModalLeave = () => {
    setCommunityModal(false);
  }

  const toggleInformationModal = () => {
    setInformationModal(true);
  }

  const toggleInformationModalLeave = () => {
    setInformationModal(false);
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
            <Link  href={'/home'} passHref>
              <span className="navbar-text-logo">Block2School</span>
            </Link>
          </div>
          <div id="navbar-links-container">
            <div id="navbar-links-main">
              <div className="scolldown-item">
                <span id="navbar-drop-title" className='navbar-text' onMouseEnter={toggleCodeHereModal} onMouseLeave={toggleCodeHereModalLeave} >Codehere</span>
                { showCodeHereModal && (
                <div onMouseEnter={toggleCodeHereModal} onMouseLeave={toggleCodeHereModalLeave} className='dropdownContent'>
                  <Link href={'/tutorials'} passHref>
                    <div id='navbar-drop-link'>
                      <span className="navbar-text">Tutorials</span>
                    </div>
                  </Link>             
                  <Link href={'/challenges'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">Challenges</span>
                    </div>                  
                  </Link>
                </div>
                )}
              </div>
              <div className="scolldown-item">
                <span id="navbar-drop-title" className='navbar-text' onMouseEnter={toggleCommunityModal} onMouseLeave={toggleCommunityModalLeave}>Community</span>
                { showCommunityModal && (
                <div onMouseEnter={toggleCommunityModal} onMouseLeave={toggleCommunityModalLeave} className='dropdownContent'>
                  <Link href={'/marketplace'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">Marketplace</span>
                    </div>                  
                  </Link>             
                  <Link href={'/forum'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">Forum</span>
                    </div>                  
                  </Link>
                </div>
                )}
              </div>
              <div className="scolldown-item">
                <span  id="navbar-drop-title" className='navbar-text' onMouseEnter={toggleInformationModal} onMouseLeave={toggleInformationModalLeave}>Information</span>
                { showInformationModal && (
                <div onMouseEnter={toggleInformationModal} onMouseLeave={toggleInformationModalLeave} className='dropdownContent'>
                  <Link href={'/faq'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">FAQ</span>
                    </div>                  
                  </Link>             
                  <Link href={'/terms-of-use'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">Terms of Use</span>
                    </div>                  
                  </Link>
                  <Link href={'/privacy-policy'} passHref>
                  <div id='navbar-drop-link'>
                      <span className="navbar-text">Privacy Policy</span>
                    </div>                      
                    </Link>
                </div>
                )}
              </div>
            </div>
          </div>
          <div id="navbar-mobile-part">
            {
              active === true ?
              <div>
                <NavbarAllBalances/>
              </div>
                :
                null
            }
            {
              active === true ? <ConnectionButton /> : null

            }
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
