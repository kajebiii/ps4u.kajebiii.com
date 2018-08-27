import * as actions from './actions';
import { combineReducers } from 'redux';

const initialAtcoderState = {
    problems: [],
    contests: [],
    translate: {},
    users: {},
}

  
const atcoder_state = (atcoder_state = initialAtcoderState, action) => {
    switch(action.type) {
        case actions.SET_BASE_ATCODER_INFORMATION:
            return {...atcoder_state, ...action.base_atcoder_information}
        case actions.SET_USER_ATCODER_INFORMATION:
            return {...atcoder_state, users: action.user_atcoder_information}
        default:
            return atcoder_state
    }
}

const atcoder_reducer = combineReducers({
    atcoder_state
});
    
export default atcoder_reducer;