import renderer from 'react-test-renderer'
import React from 'react'
import Balance from '../components/balance/balance'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import { useWeb3React } from "@web3-react/core";
import { Box, Text } from '@chakra-ui/react';



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

  test('should return balance 0 if no account', () => {
    const balance = <Text>Balance: 0.0000 BNB</Text>
    expect(wrapper.contains(balance)).toEqual(true);
  });

  test('should return token 0 if no account', () => {
    const token = <Text>CustomTokenBalance: 0.0000 ZLDKC</Text>
    expect(wrapper.contains(token)).toEqual(true);
  });

  test('should render correctly with argument', () => {
    wrapper = shallow(<Balance account={account} library={library} />)
  });
})