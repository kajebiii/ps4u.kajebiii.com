import React from 'react'

import { PageTemplate } from 'components'
import { Input, Button } from 'components'

const HandleLoginPage = ({ handle_state, children, ...props }) => {
  return (
    <PageTemplate {...props}>
      {children}
    </PageTemplate>
  )
}

export default HandleLoginPage
