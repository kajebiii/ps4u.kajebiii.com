import React from 'react'
import { connect } from 'react-redux'
import { KajebiiiBOJCodePage } from 'components'
import { get_kajebiii_boj_source_by_problem } from '../store/users/actions'


const mapStateToProps = (state) => ({boj_source: state.users.current_state.kajebiii_boj_source})
const mapDispatchToProps = (dispatch) => {
  return {
    get_boj_source: (boj_problem) => {
      dispatch(get_kajebiii_boj_source_by_problem(boj_problem))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<KajebiiiBOJCodePage {...props} />))
