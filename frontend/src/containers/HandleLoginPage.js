import React from 'react'
import { connect } from 'react-redux'
import { HandleLoginPage } from 'components'
import { handle_login } from '../store/users/actions'

const mapStateToProps = (state) => ({handle_state: state.users.handle_state})
const mapDispatchToProps = (dispatch) => {
    return {
        action_handle_login: (boj, atcoder) => {
            dispatch(handle_login(boj, atcoder))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<HandleLoginPage {...props} />))
