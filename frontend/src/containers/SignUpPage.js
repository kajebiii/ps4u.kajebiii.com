import React from 'react'
import { connect } from 'react-redux'
import { SignUpPage } from 'components'
import { sign_up, send_alert } from '../store/app_name/actions'


const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => {
    return {
        action_send_alert: (message) => {
            dispatch(send_alert(message))
        },
        action_sign_up: (username, password, email, verify_code) => {
            dispatch(sign_up(username, password, email, verify_code)) 
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<SignUpPage {...props} />))
