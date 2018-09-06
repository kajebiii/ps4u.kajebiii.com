import * as actions from './actions';
import { combineReducers } from 'redux';

const initialBojState = {
    problems: [],
    problems_sort_by_length: [],
    contests_with_problem: [],
    kajebiii_ac_problems: [],
    user_problems_state: {},
}

export const SET_KAJEBIII_BOJ_INFORMATION = 'SET_KAJEBIII_BOJ_INFORMATION'
export const SET_BASE_BOJ_INFORMATION = 'SET_BASE_BOJ_INFORMATION'
export const SET_USER_BOJ_INFORMATION = 'SET_USER_BOJ_INFORMATION'


const boj_state = (boj_state = initialBojState, action) => {
    switch(action.type) {
        case actions.SET_KAJEBIII_AC_PROBLEMS:
            return {...boj_state, kajebiii_ac_problems: action.kajebiii_ac_problems}
        case actions.SET_CONTESTS_WITH_PROBLEM:
            return {...boj_state, contests_with_problem: action.contests_with_problem}
        case actions.SET_USER_PROBLEMS_STATE:
            return {...boj_state, user_problems_state: action.user_problems_state}
        default:
            return boj_state
    }
}

const boj_reducer = combineReducers({
    boj_state
});
    
export default boj_reducer;