import React from 'react'
import PropTypes from 'prop-types'
import { Component } from 'react'
import styled, { css } from 'styled-components'
import { font, palette } from 'styled-theme'

import { Input, Button } from 'components'
import { Link } from 'react-router'

const Wrapper = styled.div`
  font-family: ${font('primary')};
  color: ${palette('grayscale', 0)};
`

const SignIn = ({ action_login, children, ...props }) => {
  let username, password;
  const send_login = () => {
    action_login(username.value, password.value);
    username.value = password.value = '';
  }
  return (
    <Wrapper {...props}>
      <Input type="text" placeholder="아이디" innerRef={(ref) => {username = ref}}></Input>
      &nbsp;
      <Input type="password" placeholder="비밀번호" innerRef={(ref) => {password = ref}}></Input>
      &nbsp;
      <Link to = "/"><Button onClick={send_login}>로그인</Button></Link>
      &nbsp;
      <Link to="/signup"><Button>회원가입</Button></Link>
      {children}
    </Wrapper>
  )
}


SignIn.propTypes = {
  reverse: PropTypes.bool,
  children: PropTypes.node,
}

export default SignIn
