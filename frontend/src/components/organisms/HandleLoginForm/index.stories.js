import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { HandleLoginForm } from 'components'

storiesOf('HandleLoginForm', module)
  .add('default', () => (
    <HandleLoginForm />
  ))
  .add('reverse', () => (
    <HandleLoginForm reverse />
  ))
