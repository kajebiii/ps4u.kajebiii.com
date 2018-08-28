import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { HandleLoginPage } from 'components'

storiesOf('HandleLoginPage', module)
  .add('default', () => (
    <HandleLoginPage />
  ))
