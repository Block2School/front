import { useState, useContext, useEffect } from 'react';
import { Select, Box } from '@chakra-ui/react';
import { languageOptions, dictionaryList } from '../../languages';
import { LanguageContext, LanguageProvider } from './language'

interface LG {
  userLanguage: string,
  dictionary: typeof dictionaryList,
}

function LanguageSwitcher() {
  const defaultLanguage = window.localStorage.getItem('rcml-lang');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage: string = languageOptions.en ? userLanguage : 'fr'
    setUserLanguage(newLanguage);
    window.localStorage.setItem('rcml-lang', newLanguage);
  };
  return (
    <Box>
      <Select value={userLanguage} onChange={handleLanguageChange} color="white" width="10%">
        <option value="fr">Français</option>
        <option value="en">English</option>
      </Select>
    </Box>
  );
}

export default LanguageSwitcher;
