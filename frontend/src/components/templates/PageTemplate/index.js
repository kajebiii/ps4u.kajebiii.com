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

const Header = styled.div`
  position: relative;
  width: 100%;
  background-color: #222;
`

const Title = styled.h1`
  padding: 20px;
  margin: 0;
  font-size: 2em;
  font-weight: bold;
  color: #ddd;
`

const PageTemplate = ( {children, ...props} ) => {
  return (
    <div>
      <Header>
        <AccountInfo {...props}/>
        <Link to="/" style={{'text-decoration': 'none'}}><Title>App_Name</Title></Link>
      </Header>
      <Wrapper>
        {children}
        <AlertList/>
      </Wrapper>
    </div>
  )
}

export default PageTemplate
