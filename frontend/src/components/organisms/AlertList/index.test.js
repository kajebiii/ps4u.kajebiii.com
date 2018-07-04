import React from 'react'
import { shallow } from 'enzyme'
import AlertList from '.'

const wrap = (props = {}) => shallow(<AlertList {...props} alert_state={{
  messages: []
}} />)


it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
