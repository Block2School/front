import renderer from 'react-test-renderer'
import React from 'react'
import Balance from '../components/balance/balance'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { useWeb3React } from "@web3-react/core";



describe('<Balance/>', () => {
  let library: any;
  let account: any;
  let wrapper: any;
  test('should render correctly with no argument', () => {
    wrapper = shallow(<Balance account={undefined} library={undefined} />)
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should render correctly with argument', () => {
    wrapper = shallow(<Balance account={account} library={library} />)
  });
})