import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

const Tr = styled.span`
  font-family: ${font('primary')};
  color: ${palette({ grayscale: 0 }, 1)};
`

Tr.propTypes = {
  palette: PropTypes.string,
  reverse: PropTypes.bool,
}

Tr.defaultProps = {
  palette: 'grayscale',
}

export default Tr
