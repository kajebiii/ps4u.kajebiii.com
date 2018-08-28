import React from 'react'
import { connect } from 'react-redux'
import { AlertList } from 'components'


const mapStateToProps = (state) => ({
    alert_state: state.users.alert_state
})
const mapDispatchToProps = (dispatch) => {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((props)=>(<AlertList {...props} />))
