import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { AtcoderGRBContest } from 'components'

storiesOf('AtcoderGRBContest', module)
  .add('default', () => (
    <AtcoderGRBContest />
  ))
  .add('reverse', () => (
    <AtcoderGRBContest reverse />
  ))
