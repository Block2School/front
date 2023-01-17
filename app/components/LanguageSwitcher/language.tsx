
import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import { Select, Box } from '@chakra-ui/react';
import { languageOptions, dictionaryList } from '../../languages';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { placeholder } from '@babel/types';

export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: dictionaryList.en,
});

export const UpdateLanguageContext = createContext({})

interface LanguageProviderProps {
  children?: any
}

// it provides the language context to app
export function LanguageProvider({ children }: LanguageProviderProps) {

  const [userLanguage, setUserLanguage] = useState('en');

  const provider = {
    userLanguage,
    dictionary: dictionaryList[userLanguage],
    userLanguageChange: (selected: string) => {
      const newLanguage = selected ? 'fr' : 'en'
      setUserLanguage(newLanguage);
      console.log(newLanguage);
    }
  };

  return (
    <LanguageContext.Provider value={provider}>
        {children}
    </LanguageContext.Provider>
  );
};

export function LanguageSwitcher() {
  // set selected language by calling context method
  const {userLanguage, userLanguageChange} = useContext(LanguageContext);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    userLanguageChange(userLanguage);
  };

  return (
      <Select value={userLanguage} onChange={handleLanguageChange} bg="grey" width="10%">
        <option value="fr">Français</option>
        <option value="en">English</option>
      </Select>
  );
}

// // get text according to id & current language
// export function Text({ tid }) {
//   const languageContext = useContext(LanguageContext);

//   return languageContext.dictionary[tid] || tid;
// };