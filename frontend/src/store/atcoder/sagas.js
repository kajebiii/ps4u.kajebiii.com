import { takeEvery, put, call, fork, select, throttle } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {delay} from 'redux-saga';
import api from 'services/api'
import * as actions from './actions'


export function* watchInitialAll(action){
}

export default function* () {
}