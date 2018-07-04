import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { SignUpPage } from 'components'

storiesOf('SignUpPage', module)
  .add('default', () => (
    <SignUpPage />
  ))
