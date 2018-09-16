import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TagPage } from 'components'

storiesOf('TagPage', module)
  .add('default', () => (
    <TagPage />
  ))
