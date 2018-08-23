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