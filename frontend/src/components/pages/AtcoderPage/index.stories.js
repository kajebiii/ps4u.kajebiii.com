import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AtcoderPage } from 'components'

storiesOf('AtcoderPage', module)
  .add('default', () => (
    <AtcoderPage />
  ))
