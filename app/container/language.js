
import React, { useState, createContext, useContext, useEffect } from 'react';

import { languageOptions, dictionaryList } from '../languages';
import { useWeb3React } from '@web3-react/core'
import { connectors } from '../components/wallet/injectors'
export const LanguageContext = createContext({
  userLanguage: 'fr',
  dictionary: dictionaryList.fr
});


// it provides the language context to app
export function LanguageProvider({ children }) {

  var defaultLanguage = LanguageContext.userLanguage;

  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
  } = useWeb3React()

  const handleConnection = async (error) => {
    console.log('error: ', error)
    console.log('error.name: ', error.name)
    if (error.name === 'UnsupportedChainIdError') {
      // display warning
      console.log('UnsupportedChainIdError')
      setIsError(true)
    }
  }

  useEffect(() => {
    defaultLanguage = window.localStorage.getItem('rcml-lang');
    // @ts-ignore
    if (defaultLanguage) activate(connectors[defaultLanguage], handleConnection)
  })

  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'fr');

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'fr'
      setUserLanguage(newLanguage);
      window.localStorage.setItem('rcml-lang', newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  );
};

// get text according to id & current language
export function Text({ tid }) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid] || tid;
};