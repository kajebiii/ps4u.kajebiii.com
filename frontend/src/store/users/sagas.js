import { takeEvery, takeLatest, put, call, fork, select, throttle } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {delay} from 'redux-saga';
import api from 'services/api'
import * as actions from './actions'
import * as atcoder_actions from '../atcoder/actions'
import * as boj_actions from '../boj/actions'


export function* watchTokenToUser(action){
    const {token} = action
    const response = yield call (fetch, '/api/user/', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Token ' + token
        },
    })
    if(response.ok){
        const result = yield call(() => response.json())
        yield put(actions.set_userinfo(result.id, result.username, token))
    }
    else{
        yield put(actions.login_fail())
    }
}

export function* watchLoginFail() {
    yield put(actions.send_alert('로그인을 먼저 해주십시오.'))
    localStorage.setItem("user_info", JSON.stringify({"id":0, "username": "", "token":""}))
}

export function* watchValidateToken(action){
    const {token} = action
    const response = yield call (fetch, '/api/user/', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Token ' + token
        },
    })
    if(response.ok){
        const result = yield call(() => response.json())
        yield put(actions.set_userinfo(result.id, result.username, token))
        yield put(actions.send_alert('정상적으로 로그인 되었습니다.'))
    }
    else{
        yield put(actions.login_fail())
    }
}

export function* watchLogout(action) {
    yield put(actions.set_userinfo(0, "", ""))
    yield put(actions.send_alert('정상적으로 로그아웃 되었습니다.'))
}

export function* watchLogin(action) {
    const {username, password} = action
    const response = yield call (fetch, '/api/obtain-auth-token/', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password})
    })
    if(response.ok) {
        const result = yield call(() => response.json())
        yield put(actions.validate_token(result.token))
    }
    else{
        yield put(actions.send_alert('올바른 아이디 혹은 비밀번호를 입력해주세요.'))
    }
}

export function* watchSendAlert(action) {
    yield put(actions.add_alert(action.message))
    yield call(delay, 5000)
    yield put(actions.del_alert())
}

export function* watchUSERINFO(action) {
    localStorage.setItem("user_info", JSON.stringify({"id":action.id, "username":action.username, "token":action.token}))
}

export function* watchSignUp(action){
    const response = yield call (fetch, `/api/user/`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'username': action.username,
            'password': action.password,
        })
    });
    if(response.ok){
        yield put(actions.send_alert('정상적으로 회원가입이 완료되었습니다.'))
        yield put(push('/'))
    }
    else if(response.status == 400){
        yield put(actions.send_alert('이미 존재하는 아이디거나, 인증코드가 올바르지 않습니다.'))
    }
}

export function* handle_login(action){
    const {boj, atcoder} = action
    yield put(actions.set_handle(boj, atcoder))
    yield put(push('/'))
    yield put(actions.send_alert('로그인하였습니다.'))
    yield put(boj_actions.boj_login(boj))
    yield put(atcoder_actions.atcoder_login(atcoder))

    localStorage.setItem("handle_info", JSON.stringify({boj, atcoder}))
}

export function* handle_logout(action){
    yield put(actions.set_handle("", ""))
    yield put(push('/'))
    yield put(actions.send_alert('로그아웃하였습니다.'))
    yield put(boj_actions.boj_logout())
    yield put(atcoder_actions.atcoder_logout())

    localStorage.setItem("handle_info", JSON.stringify({boj: "", atcoder: ""}))
}

export function* get_kajebiii_boj_source_by_problem(action) {
    const {boj_problem} = action
    const response = yield call (fetch, `/api/kajebiii/boj/last-ac-source/${boj_problem}/`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    if(response.ok){
        const result = yield call(() => response.json())
        yield put(actions.set_current_kajebiii_boj_source(result))        
        yield put(actions.send_alert(`BOJ ${boj_problem}번 코드를 가져왔습니다.`))
    }else{
        //TODO
        yield put(actions.send_alert(`BOJ ${boj_problem}번 코드를 가져오는데 실패했습니다.`))
    }
}

export function* synchronize_handle_information() {
    const handle_state = yield select((state) => state.users.handle_state)
    const {boj, atcoder} = handle_state
    yield put(actions.set_handle(boj, atcoder))
    yield put(boj_actions.boj_login(boj))
    yield put(atcoder_actions.atcoder_login(atcoder))
}
export default function* () {
    yield fork(synchronize_handle_information)

    yield takeEvery(actions.USER_LOGIN, watchLogin)
    yield takeEvery(actions.VALIDATE_TOKEN, watchValidateToken)
    yield takeEvery(actions.SET_USERINFO, watchUSERINFO)
    yield takeEvery(actions.USER_LOGOUT, watchLogout)
    yield takeEvery(actions.LOGIN_FAIL, watchLoginFail)
    yield takeEvery(actions.TOKEN_TO_USER, watchTokenToUser)
    yield takeEvery(actions.SIGN_UP, watchSignUp)
    yield takeEvery(actions.SEND_ALERT, watchSendAlert)

    yield takeLatest(actions.HANDLE_LOGIN, handle_login)
    yield takeLatest(actions.HANDLE_LOGOUT, handle_logout)

    yield takeLatest(actions.GET_KAJEBIII_BOJ_SOURCE_BY_PROBLEM, get_kajebiii_boj_source_by_problem)
}