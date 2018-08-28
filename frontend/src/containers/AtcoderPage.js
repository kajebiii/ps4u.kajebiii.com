import React from 'react'
import { connect } from 'react-redux'
import { AtcoderPage } from 'components'


const mapStateToProps = (state) => ({atcoder_state: state.atcoder.atcoder_state})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<AtcoderPage {...props} />))
