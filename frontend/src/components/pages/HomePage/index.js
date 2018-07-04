import React from 'react'

import { ChatList } from 'components'
import { PageTemplate } from 'components'

const HomePage = ( {user_state, children, ...props}) => {
  return (
      <PageTemplate {...props}>
      {
        user_state.profile.username == "" 
        ? (<h3>로그인 이후 이용하실 수 있습니다.</h3>) 
        : (<ChatList chat_list={user_state.chat_list} />)
      }
      {children}
    </PageTemplate>
  )
}

export default HomePage
