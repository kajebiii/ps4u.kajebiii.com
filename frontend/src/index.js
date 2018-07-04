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

const baseHistory = useRouterHistory(createHistory)({ basename: process.env.PUBLIC_PATH })
var initialState = {app_name:{user_state:{
  id: 0,
  nickname: "",
  token: "",
}}}
if(localStorage.getItem("user_info")){
  initialState = {app_name:{user_state:JSON.parse(localStorage.getItem("user_info"))}}
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
