import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AccountInfo } from 'components'

storiesOf('AccountInfo', module)
  .add('default', () => (
    <AccountInfo />
  ))
  .add('reverse', () => (
    <AccountInfo reverse />
  ))
