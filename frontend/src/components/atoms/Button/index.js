import { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Button = styled.button`
  padding: .5rem .75rem;
  background-color: #f0f0f0;
  border: 1px solid #aaa;
  border-radius: .3rem;
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

Button.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Button.defaultProps = {
  palette: 'grayscale',
}

export default Button
