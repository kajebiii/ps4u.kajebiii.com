import React from 'react'
import { storiesOf } from '@kadira/storybook'
import CurrPage from '.'

storiesOf('CurrPage', module)
  .add('default', () => (
    <CurrPage>Hello</CurrPage>
  ))
  .add('reverse', () => (
    <CurrPage reverse>Hello</CurrPage>
  ))
