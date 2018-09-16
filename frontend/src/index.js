import 'react-hot-loader/patch'
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createHistory } from 'history'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configure'

import routes from 'routes'

import { initialUserState, initialHandleState } from 'store/users/reducer'
/*
import { initialAtcoderState } from 'store/atcoder/reducer'
import { initialBojState } from 'store/boj/reducer'
import { initialTagState } from 'store/problem/reducer'
*/

const baseHistory = useRouterHistory(createHistory)({ basename: process.env.PUBLIC_PATH })
var initialState = {
  users:{user_state: initialUserState, handle_state: initialHandleState},
  /*
  atcoder:{atcoder_state: initialAtcoderState},
  boj:{boj_state: initialBojState},
  problem:{tag_state: initialTagState},
  */
}
if(localStorage.getItem("user_info")) {
  initialState.users.user_state = {...initialState.users.user_state, ...JSON.parse(localStorage.getItem("user_info"))}
}
if(localStorage.getItem("handle_info")) {
  initialState.users.handle_state = {...initialState.users.handle_state, ...JSON.parse(localStorage.getItem("handle_info"))}
}
const store = configureStore(initialState, baseHistory)
const history = syncHistoryWithStore(baseHistory, store)
const root = document.getElementById('app')

const renderApp = () => (
  <Provider store={store}>
    <Router key={Math.random()} history={history} routes={routes(store)} />
  </Provider>
)

render(renderApp(), root)

if (module.hot) {
  module.hot.accept('routes', () => {
    require('routes')
    render(renderApp(), root)
  })
}
