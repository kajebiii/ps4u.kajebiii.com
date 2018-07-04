import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Page from '.'

storiesOf('Page', module)
  .add('default', () => (
    <Page>Hello</Page>
  ))
  .add('reverse', () => (
    <Page reverse>Hello</Page>
  ))
