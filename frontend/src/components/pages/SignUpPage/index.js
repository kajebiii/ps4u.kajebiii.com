import React from 'react'

import { PageTemplate } from 'components'
import { Input, Button } from 'components'

const SignUpPage = ({ action_send_alert, action_verify_email, action_sign_up, children, ...props }) => {
  let username, password
  const send_sign_up = () => {
    if(username.value != undefined && password.value != undefined) {
      action_sign_up(username.value, password.value)
    }else{
      action_send_alert("빈칸을 채워주세요")
    }
  }
  return (
    <PageTemplate {...props}>
      <h1>회원가입</h1>
      <Input type="text" placeholder="username" innerRef={(ref) => {username = ref;}}></Input>
      <Input type="password" placeholder="password" innerRef={(ref) => {password = ref;}}></Input>
      <Button onClick={send_sign_up}>Sign Up</Button>
      {children}
    </PageTemplate>
  )
}

export default SignUpPage
