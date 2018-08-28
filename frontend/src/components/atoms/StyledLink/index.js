import PropTypes from 'prop-types'
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
