import React from 'react'
import { connect } from 'react-redux'
import { KajebiiiBOJSubmissionPage } from 'components'


const mapStateToProps = (state) => ({kajebiii_ac_problems: state.boj.boj_state.kajebiii_ac_problems})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<KajebiiiBOJSubmissionPage {...props} />))
