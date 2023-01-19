require('dotenv').config()
import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import AdminDashboard from '../components/adminDashboard/adminDashboard'

describe('AdminDashboard', () => {
  let wrapper: any

  test('renders', () => {
    wrapper = shallow(<AdminDashboard />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a adminDashboard component', () => {
    expect(wrapper.find('.usersAdmin-component').length).toEqual(1)
  })

  test('should render a adminDashboard component', () => {
    expect(wrapper.find('.usersAdmin-title-div').length).toEqual(7)
  })

  test('should render a adminDashboard component', () => {
    expect(wrapper.find('.usersAdmin-title').length).toEqual(7)
  })

  test('should render a adminDashboard component', () => {
    expect(wrapper.find('.admin-dashboard-grid').length).toEqual(1)
  })

  test('should render a adminDashboard component', () => {
    expect(wrapper.find('.admin-widget').length).toEqual(6)
  })
})
