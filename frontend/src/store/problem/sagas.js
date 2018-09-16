import { takeEvery, takeLatest, put, call, fork, select, throttle } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {delay} from 'redux-saga';
import api from 'services/api'
import * as actions from './actions'
import * as atcoder_actions from '../atcoder/actions'
import * as boj_actions from '../boj/actions'
import * as users_actions from '../users/actions'


const baseURL = `/api/merge`

export function* synchronize_tag_list() {
    while(true) {
        const response = yield call (fetch, baseURL + `/tag/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        })
        if(response.ok){
            const result = yield call(() => response.json())
            yield put(actions.set_tag_list(result))
        }else{
            yield put(users_actions.send_alert('문제 분류 목록 동기화에 실패했습니다.'))
        }
        yield call(delay, 1000 * 60 * 60)
    }
}

export function* get_tag_information(action) {
    const {tag_id} = action
    const response = yield call (fetch, baseURL + `/tag/${tag_id}`, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    if(response.ok){
        const result = yield call(() => response.json())
        yield put(actions.set_tag_information(result))
    }else{
        yield put(users_actions.send_alert('문제 분류를 가져오는데 실패했습니다.'))
    }
}

export default function* () {
    yield fork(synchronize_tag_list)
    
    yield takeLatest(actions.GET_TAG_INFORMATION, get_tag_information)
}
