import ReactGA from 'react-ga4';

export const sendGAEvent = (category: string, action: string, label: string) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
  console.log(`GA Event: ${category} - ${action} - ${label}`)
}