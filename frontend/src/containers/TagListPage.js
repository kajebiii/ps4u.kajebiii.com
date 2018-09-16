import React from 'react'
import { connect } from 'react-redux'
import { TagListPage } from 'components'


const mapStateToProps = (state) => ({
  tag_list: state.problem.tag_state.list
})
const mapDispatchToProps = (dispatch) => ({})
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<TagListPage {...props} />))
