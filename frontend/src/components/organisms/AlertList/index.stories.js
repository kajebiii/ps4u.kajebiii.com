import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AlertList } from 'components'

storiesOf('AlertList', module)
  .add('default', () => (
    <AlertList />
  ))
  .add('reverse', () => (
    <AlertList reverse />
  ))
