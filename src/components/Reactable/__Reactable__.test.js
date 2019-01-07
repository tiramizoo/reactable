import React from 'react'
import { shallow } from 'enzyme'

import Reactable from './Reactable.jsx'
import Sidebar from '../Sidebar'
import ScrollBar from '../ScrollBar'
import Table from '../Table'

test('<Reactable /> contain Sidebar, ScrollBar and Table', () => {
  const wrapper = shallow(<Reactable width={300} container={{ clientWidth: '400' }} updateTableWidth={(e) => {}}/>)
  expect(wrapper.find(Sidebar).length).toEqual(1)
  expect(wrapper.find(ScrollBar).length).toEqual(1)
  expect(wrapper.find(Table).length).toEqual(1)
})
