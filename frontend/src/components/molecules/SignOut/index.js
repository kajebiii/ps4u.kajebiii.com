import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { Link } from 'react-router'
import { Input, Button } from 'components'

const SignOut = ( {username, action_logout, children, ...props}) => {
  const send_logout = () => {
    action_logout()
  }
  return (
    <div {...props}>
      {username}님, 환영합니다.&nbsp;
      <Link to = "/edit"><Button>설정</Button></Link>
      &nbsp;
      <Link to = "/"><Button onClick={send_logout}>로그아웃</Button></Link>
      {children}
    </div>
  )
}

SignOut.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default SignOut
