import renderer from 'react-test-renderer'
import React, { useState } from 'react'
import MyEditor from '../components/editor/monacoEditor'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import OptionEditor from '../components/editor/optionEditor';


describe('<OptionEditor/>', () => {
  let wrapper: any;

  test('should render correctly with no arg', () => {
    wrapper = shallow(<OptionEditor changeLang={undefined} scoring={undefined} switchText={undefined} changeTheme={undefined} />)
  });

  test('should render a optionEditor component', () => {
    expect(wrapper.find('#editor_opt').length).toEqual(1)
  })

  test('should render a OptionEditor component', () => {
    expect(wrapper.find('#upload').length).toEqual(1)
  })

  test('should render a OptionEditor component', () => {
    expect(wrapper.find('#lang_choice').length).toEqual(1)
  })

  // test('should render correctly with args', () => {
  //   const theme = 'vs-dark';
  //   const lang = 'javascript';
  //   shallow(<MyEditor 
  //     theme={theme} 
  //     lang={lang} 
  //     onChange={undefined}
  //     defaultValue={''} />)
  // })

  test('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  }) 
})