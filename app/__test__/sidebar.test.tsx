import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import Sidebar from '../components/sidebar/sidebar'

describe('Sidebar', () => {
  let wrapper: any

  test('should render', () => {
    wrapper = shallow(<Sidebar />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a sidebar component', () => {
    expect(wrapper.find('.sidebar-component').length).toEqual(1)
  })

  test('should render a sidebar component', () => {
    expect(wrapper.find('.sidebar-item').length).toEqual(5)
  })

  test('should render a sidebar component', () => {
    expect(wrapper.find('.sidebar-item-title').length).toEqual(5)
  })
})
