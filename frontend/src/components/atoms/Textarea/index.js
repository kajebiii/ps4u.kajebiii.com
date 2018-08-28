import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

const styles = css`
  font-size: 16px;
  padding: 8px;
  width: 720px;
  height: 480px;
`

const Textarea = styled.textarea`${styles}`

export default Textarea
