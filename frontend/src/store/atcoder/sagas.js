import { takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
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
        }
        yield call(delay, 1000 * 60 * 60)
    }
}

export default function* () {
    yield fork(synchronize_atcoder_base_information)
}