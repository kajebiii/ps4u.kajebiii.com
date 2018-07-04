import React from 'react'
import { storiesOf } from '@kadira/storybook'
import StyledLink from '.'

storiesOf('StyledLink', module)
  .add('default', () => (
    <StyledLink>Hello</StyledLink>
  ))
  .add('reverse', () => (
    <StyledLink reverse>Hello</StyledLink>
  ))
