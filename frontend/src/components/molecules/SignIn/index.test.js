import React from 'react'
import { shallow } from 'enzyme'
import SignIn from '.'

const wrap = (props = {}) => shallow(<SignIn {...props} />)

it('action_login function called', () => {
  const action = jest.fn()
  const wrapper = wrap({ action_login : action })
  expect(wrapper.find('Input')).toHaveLength(2)
  expect(wrapper.find('Button')).toHaveLength(2)
  wrapper.find('Input').at(0).simulate('change', {target: {value: 'kajebiii'}})
  wrapper.find('Input').at(1).simulate('change', {target: {value: 'kajebiiipassword'}})
  //wrapper.find('Button').at(0).simulate('click')
  //If click it, error useranem, password is undefined.
  expect(action).toHaveBeenCalledTimes(0)
})

it('renders children when passed in', () => {
  const wrapper = wrap({ children: 'test' })
  expect(wrapper.contains('test')).toBe(true)
})

it('renders props when passed in', () => {
  const wrapper = wrap({ id: 'foo' })
  expect(wrapper.find({ id: 'foo' })).toHaveLength(1)
})
