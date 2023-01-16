
import React, { useState, createContext, useContext, useEffect } from 'react';

import { languageOptions, dictionaryList } from '../languages';

export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: dictionaryList.en
});


// it provides the language context to app
export function LanguageProvider({ children }) {

  var defaultLanguage = LanguageContext.userLanguage;

  useEffect(() => {
    defaultLanguage = window.localStorage.getItem('rcml-lang');
    // @ts-ignore
    if (defaultLanguage) activate(connectors[provider], handleConnection)
  })

  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: selected => {
      const newLanguage = languageOptions[selected] ? selected : 'en'
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