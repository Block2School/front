import Footer from '../components/footer/footer'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Navbar from '../components/navbar/navbar'
import { Image } from '@chakra-ui/react'

describe('Navbar', () => {
  let wrapper: any

  test('should render', () => {
    wrapper = shallow(<Navbar />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a navbar component', () => {
    expect(wrapper.find('#navbar-component').length).toEqual(1)
  })

  test('should render a navbar component', () => {
    expect(wrapper.find('#navbar-container').length).toEqual(1)
  })

  test('should render a navbar component', () => {
    expect(wrapper.find('#navbar-logo-container').length).toEqual(1)
  })

  test('should render a navbar component', () => {
    expect(wrapper.find(Image)).toBeTruthy()
  })

  test('should render a navbar component', () => {
    expect(wrapper.find('#navbar-links-main').length).toEqual(1)
  })

  test('should render a navbar component', () => {
    expect(wrapper.find('#navbar-links-container').length).toEqual(1)
  })
})
