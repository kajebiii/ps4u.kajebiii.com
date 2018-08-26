import React from 'react'
import { connect } from 'react-redux'
import { HandleLoginPage } from 'components'

const mapStateToProps = (state) => ({handle_state: state.user.handle_state})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<HandleLoginPage {...props} />))
