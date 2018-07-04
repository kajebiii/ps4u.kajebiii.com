import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { SignOut } from 'components'
import { SignIn } from 'components'

const Wrapper = styled.div`
  float: right;
  padding: 20px;
  color: #ddd;
  font-family: ${font('primary')};
`

const AccountInfo = ( {user_state, action_login, action_logout, children, ...props}) => {
  var username = user_state.profile.username
  if(username != "") {
    return (
      <Wrapper {...props}>
        <SignOut username={username} action_logout={action_logout}/>
        {children}
      </Wrapper>
    )
  }else{
    return (
      <Wrapper {...props}>
        <SignIn action_login={action_login}/>
        {children}
      </Wrapper>
    )
  }
}

AccountInfo.propTypes = {
  reverse: PropTypes.bool,
}

export default AccountInfo
