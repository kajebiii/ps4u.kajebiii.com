import React from 'react'
import { connect } from 'react-redux'
import { BOJLengthPage } from 'components'


const mapStateToProps = (state) => ({
  user_state: state.boj.boj_state.user_problems_state,
  problems_sort_by_length: state.boj.boj_state.problems_sort_by_length,
})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<BOJLengthPage {...props} />))
