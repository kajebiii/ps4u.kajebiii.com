import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

const styles = css`
  width: 960px;
  border-spacing: 0;
  border-collapse: collapse;
`

const Table = styled.table`${styles}`

export default Table
