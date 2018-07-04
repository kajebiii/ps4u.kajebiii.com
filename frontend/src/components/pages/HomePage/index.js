import React from 'react'

import { PageTemplate } from 'components'

const HomePage = ( {user_state, children, ...props}) => {
  return (
      <PageTemplate {...props}>
      {
        user_state.username == "" 
        ? (<h3>로그인 이후 이용하실 수 있습니다.</h3>) 
        : (<h3>로그인 하였습니다. </h3>)
      }
      {children}
    </PageTemplate>
  )
}

export default HomePage
