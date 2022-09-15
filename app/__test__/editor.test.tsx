import renderer from 'react-test-renderer'
import React from 'react'
import MyEditor from '../components/editor/editor'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';


describe('<MyEditor/>', () => {
  test('should render correctly', () => {
    const theme = 'vs-dark';
    const lang = 'javascript';
    shallow(<MyEditor theme={theme} lang={lang} onChange={undefined} defaultValue={undefined} />)
  });
})