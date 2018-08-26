import React from 'react'
import { connect } from 'react-redux'
import { SignUpPage } from 'components'
import { sign_up, send_alert } from '../store/users/actions'


const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
    return {
        action_send_alert: (message) => {
            dispatch(send_alert(message))
        },
        action_sign_up: (username, password) => {
            dispatch(sign_up(username, password)) 
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<SignUpPage {...props} />))
