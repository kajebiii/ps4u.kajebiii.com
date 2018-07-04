import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Tr from '.'

storiesOf('Tr', module)
  .add('default', () => (
    <Tr>Hello</Tr>
  ))
  .add('reverse', () => (
    <Tr reverse>Hello</Tr>
  ))
