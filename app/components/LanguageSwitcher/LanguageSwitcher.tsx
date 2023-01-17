import { useState, useContext, useEffect } from 'react';
import { Select, Box } from '@chakra-ui/react';
import { languageOptions, dictionaryList } from '../../languages';
import { LanguageContext, LanguageProvider } from './language'

// function userLanguageChange(current_langue: string) {
//   var newLanguage: string;
//   const [userLanguage, setUserLanguage] = useState(current_langue || 'en');
//   if (current_langue == "fr")
//     newLanguage = "en"
//   else
//     newLanguage = "fr"
//   setUserLanguage(newLanguage)
//   window.localStorage.setItem('rcml-lang', newLanguage);
// }

interface LG {
  userLanguage: string,
  dictionary: typeof dictionaryList,
}

function LanguageSwitcher() {
  // set selected language by calling context method
  // const { userLanguage } = useContext(LanguageContext);
  // console.log("userLanguage : ", userLanguage);
  const defaultLanguage = window.localStorage.getItem('rcml-lang');
  const [userLanguage, setUserLanguage] = useState(defaultLanguage || 'en');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage: string = languageOptions.en ? userLanguage : 'fr'
    console.log("newLanguage : ", newLanguage)
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
