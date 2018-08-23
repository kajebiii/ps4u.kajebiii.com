import * as actions from './actions';
import { combineReducers } from 'redux';

const initialUserState = {
    id: 0,
    username: "",
    token: "",
}
  
const user_state = (user_state = initialUserState, action) => {
    switch(action.type) {
        case actions.LOGIN_FAIL:
        case actions.USER_LOGOUT:
            return initialUserState
        case actions.SET_USERINFO:
            return {...user_state, id: action.id, username: action.username, token: action.token}
        default:
            return user_state
    }
}

const initialAlertState = {
    messages: []
}
const alert_state = (alert_state = initialAlertState, action) => {
    switch(action.type) {
        case actions.DEL_ALERT:
            return {...alert_state, messages:(alert_state.messages.slice(1))}
        case actions.ADD_ALERT:
            return {...alert_state, messages:[...alert_state.messages, action.message]}
        default:
            return alert_state
    }
}


const users_reducer = combineReducers({
    user_state,
    alert_state
});
    
export default users_reducer;