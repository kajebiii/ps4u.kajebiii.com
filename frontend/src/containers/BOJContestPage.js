import React from 'react'
import { connect } from 'react-redux'
import { BOJContestPage } from 'components'


const mapStateToProps = (state) => ({
  contest_with_problem_state: state.boj.boj_state.contest_with_problem,
  user_state: state.boj.boj_state.users
})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<BOJContestPage {...props} />))
