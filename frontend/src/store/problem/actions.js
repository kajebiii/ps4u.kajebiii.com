export const SET_TAG_LIST = 'SET_TAG_LIST'
export const set_tag_list = (tag_list) => ({type: SET_TAG_LIST, tag_list})



export const SET_TAG_INFORMATION = 'SET_TAG_INFORMATION'
export const GET_TAG_INFORMATION = 'GET_TAG_INFORMATION'
export const set_tag_information = (tag_information) => ({type: SET_TAG_INFORMATION, tag_information})
export const get_tag_information = (tag_id) => ({type: GET_TAG_INFORMATION, tag_id})