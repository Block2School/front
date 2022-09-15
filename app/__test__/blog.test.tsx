import renderer from 'react-test-renderer'
import React from 'react'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import BlogCard from '../components/blog/blogCard';


describe('<Blog/>', () => {
  test('should render correctly', () => {
    shallow(<BlogCard id={0} title={''} author={''} markdownUrl={''} publicationDate={0} shortDescription={''} editDate={0}/>)
  });
})