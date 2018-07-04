import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { SignIn } from 'components'

storiesOf('SignIn', module)
  .add('default', () => (
    <SignIn>Hello</SignIn>
  ))
  .add('reverse', () => (
    <SignIn reverse>Hello</SignIn>
  ))
