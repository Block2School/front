require('dotenv').config()
import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import UserAdmin from '../components/makeUsersAdminWidget/makeUsersAdmin'

describe('userAdmin', () => {
  let wrapper: any

  test('should render correctly', () => {
    wrapper = shallow(<UserAdmin />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a user admin component', () => {
    expect(wrapper.find('.usersAdmin-component').length).toEqual(1)
  })

  test('should render a title div', () => {
    expect(wrapper.find('.usersAdmin-title-div').length).toEqual(1)
  })

  test('should render a title', () => {
    expect(wrapper.find('.usersAdmin-title').length).toEqual(1)
  })

  test('should render a user lists div', () => {
    expect(wrapper.find('.user-lists-div').length).toEqual(1)
  })

  test('should render a person list div', () => {
    expect(wrapper.find('.person-list-div').length).toEqual(1)
  })
})
