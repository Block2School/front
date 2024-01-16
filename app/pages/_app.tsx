import '../styles/terms-of-use.css'
import '../styles/privacy-policy.css'
import '../styles/globals.css'
import '../styles/faq.css'
import '../styles/tutorial.css'
import '../styles/tutorials.css'
import '../styles/profile.css'
import '../styles/home.css'
import '../styles/blog.css'
import '../styles/marketplace.css'
import '../components/wallet/connectionButton.css'
import '../components/modals/wallets/walletsModal.css'
import '../components/navbar/navbar.css'
import '../components/sidebar/sidebar.css'
import '../components/usersAdminWidget/usersAdmin.css'
import '../components/adminBlog/adminBlog.css'
import '../components/adminDashboard/adminDashboard.css'
import '../components/footer/footer.css'
import '../components/adminTutorials/tutorialsAdmin.css'
import '../components/alerts/errorAlert/errorAlert.css'
import '../components/alerts/successAlert/successAlert.css'
import 'bootstrap/dist/css/bootstrap.css'

import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { ChakraProvider } from "@chakra-ui/react";
import { WebSocketProvider } from '../context/WebSocketContext'

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga4'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID

import { LanguageProvider } from "../components/LanguageSwitcher/language";
import Script from 'next/script'
import * as Sentry from "@sentry/react";
import mixpanel from 'mixpanel-browser'
import { MixPanelTracking } from '../services/mixpanel'

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

// Sentry.init({
//   dsn: "https://a453314469f5541ab6fa937c6f8d14a9@o4505866759634944.ingest.sentry.io/4505866778902528",
//   integrations: [
//     new Sentry.BrowserTracing({
//       tracePropagationTargets: [new RegExp(process.env.NEXT_PUBLIC_API_URL as string + "/*")],
//     }),
//     new Sentry.Replay(),
//   ],
//   tracesSampleRate: 1.0,
//   replaysSessionSampleRate: 0.1,
//   replaysOnErrorSampleRate: 1.0,
// });

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  ReactGA.initialize(GA_ID as string)
  ReactGA.send({ hitType: "event", eventCategory: "pageview", eventAction: "pageview", eventLabel: router.pathname })
  // ReactGA.pageview(router.pathname)
  useEffect(() => {
    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      ReactGA.initialize(GA_ID as string)
      ReactGA.send({ hitType: "pageview", page: url })
      // ReactGA.send({ hitType: "event", eventCategory: "test_click", eventAction: "test_click", eventLabel: "TEST CLICK" })
      console.log(`App is changing to ${url} ${shallow ? "with" : "without"} shallow routing`)
      MixPanelTracking.getInstance().pageViewed();
    }
    router.events.on("routeChangeComplete", handleRouteChange)

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange)
  //   }
  // }, [router.events])

  return (
    <LanguageProvider>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={getLibrary}>
        <WebSocketProvider>
          <Script
            src={`https://tools.luckyorange.com/core/lo.js?site-id=795a5d80`}
            strategy="afterInteractive"
            async
            defer
          ></Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          ></Script>
          {/* 👇 gtag function definition. notice that we don't send page views at this point.  */}
          <Script
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `,
            }}
          />
          <Component {...pageProps} />
          </WebSocketProvider>
        </Web3ReactProvider>
      </ChakraProvider>
    </LanguageProvider>
  );

}

export default MyApp
