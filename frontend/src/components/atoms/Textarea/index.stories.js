import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Textarea from '.'

storiesOf('Textarea', module)
  .add('default', () => (
    <Textarea>Hello</Textarea>
  ))
  .add('reverse', () => (
    <Textarea reverse>Hello</Textarea>
  ))
