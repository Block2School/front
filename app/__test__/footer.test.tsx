import Footer from '../components/footer/footer'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('footer', () => {
  let wrapper: any

  test('should render correctly', () => {
    wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })

  test('renders the correct text and logo in the footer', () => {
    expect(wrapper.find('#footer-logo-container')).toHaveLength(1)
  })

  test('renders the correct text in the footer', () => {
    expect(wrapper.find('.footer-text').at(0).text()).toBe('Block2School')
  })
  test('renders the correct text in the footer', () => {
    expect(wrapper.find('.footer-text').at(1).text()).toBe('Terms of use')
  })

  test('renders the correct text in the footer', () => {
    expect(wrapper.find('.footer-text').at(2).text()).toBe('Privacy Policy')
  })
})
