require('dotenv').config()
import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
import UserCard from '../components/makeUsersAdminWidget/adminUserCard'

describe('userCard', () => {
  let wrapper: any
  let mockPerson = {
    name: 'John Doe',
    id: '123',
  }

  test('should render correctly', () => {
    wrapper = shallow(<UserCard person={mockPerson} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a user card', () => {
    expect(wrapper.find('.user-card-div').length).toEqual(1)
  })

  test('should render a user name', () => {
    expect(wrapper.find('h1').text()).toEqual(mockPerson.name)
  })

  test('should render a button', () => {
    expect(wrapper.find('.ban-button').length).toEqual(1)
  })

  test('should render a button with the correct text', () => {
    expect(wrapper.find('.ban-button').text()).toEqual('Unmod User')
  })
})
