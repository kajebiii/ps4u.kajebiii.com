import React from 'react'

import { PageTemplate } from 'components'
import { HandleLoginForm } from 'components'

let undefinedToEmpty = (dict, key) => (key in dict ? dict[key] : "")

class HandleLoginPage extends React.Component {
  constructor( props ){
    super(props)
  }
  send_handle = values => {
    var { action_handle_login } = this.props
    console.log(undefinedToEmpty(values, "boj"),undefinedToEmpty(values, "atcoder"))
    action_handle_login(undefinedToEmpty(values, "boj"),undefinedToEmpty(values, "atcoder"))
  }
  render(){
    var { handle_state, children, ...props } = this.props
    console.log(handle_state)
    return (
      <PageTemplate {...props}>
        <h1>Handle Login Page</h1>
        <h2>BOJ : {handle_state.boj}</h2>
        <h2>Atcoder : {handle_state.atcoder}</h2>
        <HandleLoginForm onSubmit={this.send_handle}/>
        {children}
      </PageTemplate>
    )
  }
}

export default HandleLoginPage
