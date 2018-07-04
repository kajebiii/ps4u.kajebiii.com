import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Table from '.'

storiesOf('Table', module)
  .add('default', () => (
    <Table>Hello</Table>
  ))
  .add('reverse', () => (
    <Table reverse>Hello</Table>
  ))
