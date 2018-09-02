export const SET_KAJEBIII_BOJ_INFORMATION = 'SET_KAJEBIII_BOJ_INFORMATION'
export const SET_BASE_BOJ_INFORMATION = 'SET_BASE_BOJ_INFORMATION'
export const SET_USER_BOJ_INFORMATION = 'SET_USER_BOJ_INFORMATION'
export const set_kajebiii_boj_information = (kajebiii_boj_information) => ({type: SET_KAJEBIII_BOJ_INFORMATION, kajebiii_boj_information})
export const set_base_boj_information = (contest_with_problem) => ({type: SET_BASE_BOJ_INFORMATION, contest_with_problem})
export const set_user_boj_information = (user_boj_information) => ({type: SET_USER_BOJ_INFORMATION, user_boj_information})

export const BOJ_LOGIN = 'BOJ_LOGIN'
export const BOJ_LOGOUT = 'BOJ_LOGOUT'
export const boj_login = (username) => ({type: BOJ_LOGIN, username})
export const boj_logout = () => ({type: BOJ_LOGOUT})

