import renderer from 'react-test-renderer'
import React from 'react'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import BlogCard from '../components/blog/blogCard';
import { Box, Text } from '@chakra-ui/react';
import Link from 'next/link';


describe('<Blog/>', () => {
  test('should render correctly', () => {
    shallow(<BlogCard id={0} title={''} author={''} markdownUrl={''} publicationDate={0} shortDescription={''} editDate={0}/>)
  });

  let wrapper: any;
  test('should return the right title', () => {
    const tmp = "okok"
    wrapper = shallow(<BlogCard id={0} title={tmp} author={''} markdownUrl={''} publicationDate={0} shortDescription={''} editDate={0}/>)
    const title = <Text fontWeight='bold' fontSize='x-large'>{tmp}</Text>
    expect(wrapper.contains(title)).toEqual(true);
  });

  test('should return the right description', () => {
    const tmp = "okok"
    wrapper = shallow(<BlogCard id={0} title={''} author={''} markdownUrl={''} publicationDate={0} shortDescription={tmp} editDate={0}/>)
    const author = <Text width='80%'>{tmp}</Text>
    expect(wrapper.contains(author)).toEqual(true);
  });

  test('should return the right publishe date', () => {
    const tmp = 4;
    wrapper = shallow(<BlogCard id={0} title={''} author={''} markdownUrl={''} publicationDate={tmp} shortDescription={''} editDate={0}/>)
    const author = <Text fontWeight='light'fontSize='sm' paddingBottom='2%'>Published: {tmp}</Text>
    expect(wrapper.contains(author)).toEqual(true);
  });

  test('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  }) 

})