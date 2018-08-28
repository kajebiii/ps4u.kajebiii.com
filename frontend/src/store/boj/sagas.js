import { takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { delay } from 'redux-saga';
import api from 'services/api'
import * as actions from './actions'
import * as users_actions from '../users/actions'

const baseURL = `/api/boj`

export function* synchronize_boj_kajebiii_information() {
    while(true) {
        const response = yield call (fetch, baseURL + `/ac-problem-list/kajebiii/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            const result = yield call(() => response.json())
            yield put(actions.set_kajebiii_boj_information(result))
            yield put(users_actions.send_alert('kajebiii의 맞은 문제 목록을 동기화했습니다.'))
        }else{
            // TODO
            yield put(users_actions.send_alert('kajebiii의 맞은 문제 목록 동기화에 실패했습니다.'))
        }
        yield call(delay, 1000 * 60 * 30)
    }
}

export default function* () {
    yield fork(synchronize_boj_kajebiii_information)
}