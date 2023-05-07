/**
* @jest-environment node
*/

import ContactForm from '../components/ContactForm/contact-form'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('ContactForm', () => {
  let wrapper: any

  test('should render correctly', () => {
    wrapper = shallow(<ContactForm />)
    expect(wrapper).toMatchSnapshot()
  })


  test('renders the correct text and logo in the form', () => {
    expect(wrapper.find('.ContactForm').length).toEqual(1)
  })

  test('renders the correct text and logo in the form', () => {
    expect(wrapper.find('.container').length).toEqual(1)
  })

  test('renders the correct text and logo in the form', () => {
    expect(wrapper.find('.contactForm').length).toEqual(1)
  })

  test('renders the correct text in the form', () => {
    console.log(wrapper.find('.info.text').at(0))
    expect(wrapper.find('.info-text').at(0).text()).toBe('Une Question ? Contact nousNous vous répondrons dans les plus bref délais')
  })
  // test('renders the correct text in the footer', () => {
  //   expect(wrapper.find('.footer-text').at(1).text()).toBe('Terms of use')
  // })

  // test('renders the correct text in the footer', () => {
  //   expect(wrapper.find('.footer-text').at(2).text()).toBe('Privacy Policy')
  // })
})
