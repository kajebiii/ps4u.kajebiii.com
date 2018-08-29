export const USER_LOGIN = 'USER_LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const VALIDATE_TOKEN = 'VALIDATE_TOKEN'
export const SET_USERINFO = 'SET_USERINFO'
export const TOKEN_TO_USER = 'TOKEN_TO_USER'
export const SIGN_UP = 'SIGN_UP'
export const USER_LOGOUT = 'USER_LOGOUT'
export const user_login = (username, password) => ({type: USER_LOGIN, username, password})
export const login_success = () => ({type: LOGIN_SUCCESS})
export const login_fail = () => ({type: LOGIN_FAIL})
export const validate_token = (token) => ({type: VALIDATE_TOKEN, token})
export const set_userinfo = (id, username, token) => ({type: SET_USERINFO, id, username, token})
export const user_logout = () => ({type: USER_LOGOUT})
export const token_to_user = (token) => ({type: TOKEN_TO_USER, token})
export const sign_up = (username, password) => ({type: SIGN_UP, username, password})



export const DEL_ALERT = 'DEL_ALERT'
export const ADD_ALERT = 'ADD_ALERT'
export const SEND_ALERT = 'SEND_ALERT'
export const del_alert = () => ({type:DEL_ALERT})
export const add_alert = (message) => ({type:ADD_ALERT, message})
export const send_alert = (message) => ({type:SEND_ALERT, message})



export const SET_HANDLE = 'SET_HANDLE'
export const HANDLE_LOGIN = 'HANDLE_LOGIN'
export const HANDLE_LOGOUT = 'HANDLE_LOGOUT'
export const set_handle = (boj, atcoder) => ({type:SET_HANDLE, boj, atcoder})
export const handle_login = (boj, atcoder) => ({type:HANDLE_LOGIN, boj, atcoder})
export const handle_logout = () => ({type:HANDLE_LOGOUT})


export const SET_CURRENT_KAJEBIII_BOJ_SOURCE = 'SET_CURRENT_KAJEBIII_BOJ_SOURCE'
export const GET_KAJEBIII_BOJ_SOURCE_BY_PROBLEM = 'GET_KAJEBIII_BOJ_SOURCE_BY_PROBLEM'
export const set_current_kajebiii_boj_source = (kajebiii_boj_source) => ({type:SET_CURRENT_KAJEBIII_BOJ_SOURCE, kajebiii_boj_source})
export const get_kajebiii_boj_source_by_problem = (boj_problem) => ({type:GET_KAJEBIII_BOJ_SOURCE_BY_PROBLEM, boj_problem})