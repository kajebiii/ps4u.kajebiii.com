import React, { PropTypes } from 'react'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

const styles = css`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
  padding: .5rem .75rem;
  border: 1px solid #ccc;
  border-radius: .3rem;
`

const Input = styled.input`${styles}`

export default Input
