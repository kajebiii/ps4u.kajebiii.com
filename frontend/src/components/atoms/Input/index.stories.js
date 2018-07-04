import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Input from '.'

storiesOf('Input', module)
  .add('default', () => (
    <Input>Hello</Input>
  ))
  .add('reverse', () => (
    <Input reverse>Hello</Input>
  ))
