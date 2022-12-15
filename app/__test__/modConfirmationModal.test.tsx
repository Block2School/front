require('dotenv').config()
import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import BanModal from '../components/makeUsersAdminWidget/modConfirmationModal'

describe('banModal', () => {
  let wrapper: any
  let person = {
    name: 'John Doe',
    id: '123',
  }
  let closeModal = () => {
    console.log('test')
  }

  test('should render correctly', () => {
    wrapper = shallow(<BanModal person={person} closeModal={closeModal} />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.background-modal').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.modal-container').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.modal-title').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.modal-body').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.modal-footer').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('.unban-button').length).toEqual(2)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('h1').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('h4').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('input').length).toEqual(1)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('button').length).toEqual(2)
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('button').at(0).text()).toEqual('Mod')
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('button').at(1).text()).toEqual('Cancel')
  })

  test('should render a ban modal component', () => {
    expect(wrapper.find('h1').text()).toEqual(
      'Are you sure you want to mod ' + person.name + '?',
    )
  })
})
