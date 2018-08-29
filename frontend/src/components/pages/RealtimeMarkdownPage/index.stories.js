import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { RealtimeMarkdownPage } from 'components'

storiesOf('RealtimeMarkdownPage', module)
  .add('default', () => (
    <RealtimeMarkdownPage />
  ))
