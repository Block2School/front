import '../styles/terms-of-use.css'
import '../styles/privacy-policy.css'
import '../styles/globals.css'
import '../styles/faq.css'
import '../styles/tutorial.css'
import '../styles/tutorials.css'
import '../styles/profile.css'
import '../styles/home.css'
import '../components/wallet/connectionButton.css'
import '../components/modals/wallets/walletsModal.css'
import '../components/navbar/navbar.css'
import '../components/sidebar/sidebar.css'
import '../components/usersAdminWidget/usersAdmin.css'
import '../components/adminBlog/adminBlog.css'
import '../components/adminDashboard/adminDashboard.css'
import '../components/footer/footer.css'
import '../components/adminTutorials/tutorialsAdmin.css'
import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'

import { Web3ReactProvider } from '@web3-react/core'
import Web3 from 'web3'
import { provider } from 'web3-core'

import { ChakraProvider } from '@chakra-ui/react'

const getLibrary = (provider: provider) => {
  return new Web3(provider)
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Component {...pageProps} />
      </Web3ReactProvider>
    </ChakraProvider>
  )
}

export default MyApp
