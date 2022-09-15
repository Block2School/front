import renderer from 'react-test-renderer'
import React from 'react'
import Balance from '../components/balance/balance'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';


describe('<Balance/>', () => {
  test('should render correctly', () => {
    shallow(<Balance account={undefined} library={undefined} />)
  });
})