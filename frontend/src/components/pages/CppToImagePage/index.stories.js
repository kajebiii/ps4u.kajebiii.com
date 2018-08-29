import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { CppToImagePage } from 'components'

storiesOf('CppToImagePage', module)
  .add('default', () => (
    <CppToImagePage />
  ))
