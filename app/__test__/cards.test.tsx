import renderer from 'react-test-renderer'
import React from 'react'
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
import { shallow } from 'enzyme';
import { render, screen } from '@testing-library/react';
import TutorialCategoryCard from '../components/cards/tutorialCategoryCard';


describe('<TutorialCategoryCard/>', () => {
  let wrapper: any;
  test('should render correctly', () => {
    wrapper = shallow(<TutorialCategoryCard name={''} image={''} description={''} callback={undefined} />)
  });

  test('match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })
  
})