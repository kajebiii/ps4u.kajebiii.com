import { PropTypes } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router'

const StyledLink = styled(Link)`
  textDecoration: none;
  color: #39f;
  &:hover {
    textDecoration: underline;
  }
`

export default StyledLink
