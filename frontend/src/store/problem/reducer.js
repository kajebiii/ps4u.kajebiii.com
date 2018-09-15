import * as actions from './actions';
import { combineReducers } from 'redux';

const initialTagState = {
    list: [],
    current: {
        list: [],
        current: {},
        boj: [],
    }
}
const tag_state = (tag_state = initialTagState, action) => {
    switch(action.type) {
        case actions.SET_TAG_LIST:
            return {...tag_state, list: action.tag_list}
        case actions.SET_TAG_INFORMATION:
            return {...tag_state, current: action.tag_information}
        default:
            return tag_state
    }
}

const problem_reducer = combineReducers({
    tag_state,
});
    
export default problem_reducer;