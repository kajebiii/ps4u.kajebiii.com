import React from 'react'
import { connect } from 'react-redux'
import { PageTemplate } from 'components'
import { handle_logout } from '../store/users/actions'

const mapStateToProps = (state) => ({handle_state: state.users.handle_state})
const mapDispatchToProps = (dispatch) => {
    return {
        action_handle_logout: () => {
            dispatch(handle_logout())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<PageTemplate {...props} />))
