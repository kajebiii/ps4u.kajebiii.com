import React from 'react'
import { shallow } from 'enzyme'
import SignOut from '.'

const wrap = (props = {}) => shallow(<SignOut {...props} />)

it('action_logout function called', () => {
  const action = jest.fn()
  const wrapper = wrap({ action_logout : action })
  expect(wrapper.find('Button')).toHaveLength(2)
  wrapper.find('Button').at(1).simulate('click')
  expect(action).toHaveBeenCalledTimes(1)
})

it('renders username when passed in', () => {
  let username = "kajebiii"
  const wrapper = wrap({username: username});
  expect(wrapper.contains(username)).toBe(true)
})

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' })
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
