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

const initialHanldeState = {
    boj: "",
    atcoder: "",
}
const handle_state = (handle_state = initialHanldeState, action) => {
    switch(action.type) {
        case actions.SET_HANDLE:
            return {...handle_state, boj: action.boj, atcoder: action.atcoder}
        default:
            return handle_state
    }
}

const initialCurrentState = {
    kajebiii_boj_source: "",
}
const current_state = (current_state = initialCurrentState, action) => {
    switch(action.type) {
        case actions.SET_CURRENT_KAJEBIII_BOJ_SOURCE:
            return {...current_state, kajebiii_boj_source: action.kajebiii_boj_source}
        default:
            return current_state
    }
}

const users_reducer = combineReducers({
    user_state,
    alert_state,
    handle_state,
    current_state
});
    
export default users_reducer;