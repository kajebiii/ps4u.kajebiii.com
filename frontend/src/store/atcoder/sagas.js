import { takeLatest, takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { delay } from 'redux-saga';
import api from 'services/api'
import * as actions from './actions'
import * as users_actions from '../users/actions'

const baseURL = `/api/atcoder`

export function* synchronize_atcoder_base_information() {
    while(true) {
        const response = yield call (fetch, baseURL + `/base-information/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            const result = yield call(() => response.json())
            yield put(actions.set_base_atcoder_information(result))
        }else{
            // TODO
            yield put(users_actions.send_alert('Atcoder 문제 정보 동기화에 실패했습니다.'))
        }
        yield call(delay, 1000 * 60 * 60)
    }
}

export function* get_atcoder_user_information(action) {
    const {username} = action
    const response = yield call (fetch, baseURL + `/problem-list/${username}/`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    if(response.ok){
        const result = yield call(() => response.json())
        yield put(actions.set_user_atcoder_information(result))
    }else{
        yield put(users_actions.send_alert('Atcoder 사용자 정보를 가져오는데 실패했습니다.'))
    }
}
export function* clear_atcoder_user_information(action) {
    yield put(actions.set_user_atcoder_information({}))
}      

export default function* () {
    yield fork(synchronize_atcoder_base_information)

    yield takeLatest(actions.ATCODER_LOGIN, get_atcoder_user_information)
    yield takeLatest(actions.ATCODER_LOGOUT, clear_atcoder_user_information)
}
