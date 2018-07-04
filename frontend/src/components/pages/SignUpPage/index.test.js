import React from 'react'
import { shallow } from 'enzyme'
import SignUpPage from '.'

it('renders', () => {
  shallow(<SignUpPage 
    alert_state={{
      messages: []
    }}
  />)
})
