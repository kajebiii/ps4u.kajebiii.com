import React from 'react'
import styled, { css } from 'styled-components'

import { AccountInfo } from 'containers'
import { AlertList } from 'containers'
import { Link } from 'react-router'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`

const PageTemplate = ( {handle_state, action_handle_logout, children, ...props} ) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbarNavAltMarkupo">
      <Link to="/" className="navbar-brand" href="/">PS4U</Link>
      <ul className="navbar-nav">
      {
        handle_state.boj == "" && handle_state.atcoder == ""
        ? <li><Link className="nav-item nav-link" to="/handle-login">Login</Link></li>
        : <li><Link className="nav-item nav-link" to="/" onClick={action_handle_logout} style={{"cursor": "pointer"}}>Logout</Link></li>        
      }
      </ul>
      <AccountInfo {...props}/>
      </nav>
      
      <Wrapper>
        <div className="container">
          {children}
        </div>
        <AlertList/>
      </Wrapper>
    </div>
  )
}

export default PageTemplate
