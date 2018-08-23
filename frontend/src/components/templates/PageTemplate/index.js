import React from 'react'
import styled, { css } from 'styled-components'

import { AccountInfo } from 'containers'
import { AlertList } from 'containers'
import { Link } from 'react-router'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const PageTemplate = ( {children, ...props} ) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbarNavAltMarkupo">
      <Link to="/" className="navbar-brand" href="/">Problem Solving For You</Link>
      <AccountInfo {...props}/>
      </nav>
      
      <Wrapper>
        {children}
        <AlertList/>
      </Wrapper>
    </div>
  )
}

export default PageTemplate
