import ReactGA from 'react-ga4';

export const sendGAEvent = (category: string, action: string, label: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
  console.log(`GA Event: ${category} - ${action} - ${label}`)
}

export const formatLanguageToServerLanguage = (language: string): string => {
  const _language = language.toLowerCase()
  switch (_language) {
    case 'python':
      return 'py';
    case 'javascript':
      return 'js';
    case 'c':
      return 'c';
    case 'c++':
      return 'cpp';
    case 'cpp':
      return 'cpp';
    case 'r':
      return 'R';
    default:
      return 'py';
  }
}