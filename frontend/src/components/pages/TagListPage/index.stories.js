import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { TagListPage } from 'components'

storiesOf('TagListPage', module)
  .add('default', () => (
    <TagListPage />
  ))
