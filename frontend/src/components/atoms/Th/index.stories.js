import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Th from '.'

storiesOf('Th', module)
  .add('default', () => (
    <Th>Hello</Th>
  ))
  .add('reverse', () => (
    <Th reverse>Hello</Th>
  ))
