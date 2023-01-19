import renderer from 'react-test-renderer'
import React, { useState } from 'react'
import MyEditor from '../components/editor/monacoEditor'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';


describe('<MyEditor/>', () => {
  let wrapper: any;

  test('should render correctly with no arg', () => {
    wrapper = shallow(<MyEditor theme={undefined} lang={undefined} onChange={undefined} defaultValue={undefined} />)
  });

  test('should render correctly with args', () => {
    const theme = 'vs-dark';
    const lang = 'javascript';
    shallow(<MyEditor 
      theme={theme} 
      lang={lang} 
      onChange={undefined}
      defaultValue={''} />)
  })

  test('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
})