import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router'

const Page = styled(Link)`
  textDecoration: none;
  color: #39f;
  display: inline-block;
  padding: 6px 15px;
  text-align: center;
  border: 1px solid #ccc;
  &:hover {
    background-color: #06c;
    color: #eee;
    border: 1px solid #06c;
  }
`

export default Page
