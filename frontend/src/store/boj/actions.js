export const SET_KAJEBIII_AC_PROBLEMS = 'SET_KAJEBIII_AC_PROBLEMS'
export const SET_CONTESTS_WITH_PROBLEM = 'SET_CONTESTS_WITH_PROBLEM'
export const SET_USER_PROBLEMS_STATE = 'SET_USER_PROBLEMS_STATE'
export const set_kajebiii_ac_problems = (kajebiii_ac_problems) => ({type: SET_KAJEBIII_AC_PROBLEMS, kajebiii_ac_problems})
export const set_contests_with_problem = (contests_with_problem) => ({type: SET_CONTESTS_WITH_PROBLEM, contests_with_problem})
export const set_user_problems_state = (user_problems_state) => ({type: SET_USER_PROBLEMS_STATE, user_problems_state})

export const BOJ_LOGIN = 'BOJ_LOGIN'
export const BOJ_LOGOUT = 'BOJ_LOGOUT'
export const boj_login = (username) => ({type: BOJ_LOGIN, username})
export const boj_logout = () => ({type: BOJ_LOGOUT})

