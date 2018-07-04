import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Td from '.'

storiesOf('Td', module)
  .add('default', () => (
    <Td>Hello</Td>
  ))
  .add('reverse', () => (
    <Td reverse>Hello</Td>
  ))
