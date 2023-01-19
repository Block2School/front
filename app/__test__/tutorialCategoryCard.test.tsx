import { Box, Image, Text } from '@chakra-ui/react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

import TutorialCategoryCard from '../components/cards/tutorialCategoryCard'

describe('tutorialCategoryCard', () => {
  let wrapper: any

  test('should render correctly', () => {
    wrapper = shallow(
      <TutorialCategoryCard
        name={'test'}
        image={'hello'}
        description={'hi'}
        callback={undefined}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('should render a tutorial category card component', () => {
    expect(wrapper.find(Box).length).toEqual(1)
  })

  test('should render a tutorial category card component', () => {
    expect(wrapper.find(Image)).toBeTruthy()
  })

  test('should render a tutorial category card component', () => {
    expect(wrapper.find(Text).first().length).toEqual(1)
  })

  test("should render a tutorial category card component's text", () => {
    expect(wrapper.find(Text).first().props()).toEqual({
      children: 'test',
      style: {
        padding: '0px 10px 0px 10px',
        color: '#ffe6c4',
      },
      fontSize: 'sm',
      fontWeight: 'semibold',
    })
  })
})
