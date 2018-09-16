import React from 'react'
import { connect } from 'react-redux'
import { TagPage } from 'components'
import { get_tag_information } from '../store/problem/actions'


const mapStateToProps = (state) => ({
  tag_information: state.problem.tag_state.current,
  user_state: state.boj.boj_state.user_problems_state
})
const mapDispatchToProps = (dispatch) => {
  return {
    get_tag_information: (tag_id) => {
      dispatch(get_tag_information(tag_id))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<TagPage {...props} />))
