import * as actions from './actions';
import { combineReducers } from 'redux';

const initialBojState = {
    problems: [],
    contests: [],
    kajebiii_ac_problems: [],
    users: {},
}

export const SET_KAJEBIII_BOJ_INFORMATION = 'SET_KAJEBIII_BOJ_INFORMATION'
export const SET_BASE_BOJ_INFORMATION = 'SET_BASE_BOJ_INFORMATION'
export const SET_USER_BOJ_INFORMATION = 'SET_USER_BOJ_INFORMATION'


const boj_state = (boj_state = initialBojState, action) => {
    switch(action.type) {
        case actions.SET_KAJEBIII_BOJ_INFORMATION:
            return {...boj_state, kajebiii_ac_problems: action.kajebiii_boj_information}
        case actions.SET_BASE_BOJ_INFORMATION:
            return {...boj_state, ...action.base_boj_information}
        case actions.SET_USER_BOJ_INFORMATION:
            return {...boj_state, users: action.user_boj_information}
        default:
            return boj_state
    }
}

const boj_reducer = combineReducers({
    boj_state
});
    
export default boj_reducer;