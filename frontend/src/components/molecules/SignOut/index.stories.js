import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { SignOut } from 'components'

storiesOf('SignOut', module)
  .add('default', () => (
    <SignOut>Hello</SignOut>
  ))
  .add('reverse', () => (
    <SignOut reverse>Hello</SignOut>
  ))
