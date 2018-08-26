import React from 'react'
import { shallow } from 'enzyme'
import HandleLoginPage from '.'

it('renders', () => {
  shallow(<HandleLoginPage 
    alert_state={{
      messages: []
    }}
  />)
})
