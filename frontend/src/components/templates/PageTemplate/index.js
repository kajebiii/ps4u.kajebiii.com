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
        : <div></div>
      }
      {
        handle_state.boj != "" || handle_state.atcoder != ""
        ? <li><Link className="nav-item nav-link" onClick={action_handle_logout} style={{"cursor": "pointer"}}>Logout</Link></li>        
        : <div></div>
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

      <footer className="pt-4 my-md-5 pt-md-5 border-top container">
      <div className="row">
        <div className="col-12 col-sm-4 text-center">
        <ul className="list-unstyled text-small">
        <h5><a className="nav-item nav-link" onClick={() => {window.scrollTo(0, 0)}} style={{"cursor": "pointer"}}>TOP</a></h5>
        </ul>
        </div>
        <div className="col-12 col-sm-4 text-center">
        <h5>E-mail</h5>
        <img src={require('./email.png')} alt="E-mail" style={{'maxWidth':'100%'}}></img>
        <h5>
          {/*
          <a 
            href="{% if 'admin' in session %}{{url_for('admin_logout')}}{% else %}{{url_for('admin_login')}}{% endif %}" 
            style={{'color': '#FFFFFF', 'text-decoration': 'none'}}>
            Admin
          </a>*/}
        </h5>
        </div>
        <div className="col-12 col-sm-4 text-center">
        <ul className="list-unstyled text-small">
        <h5><a className="text-muted" href="https://github.com/kajebiii/ps4u.kajebiii.com">GitHub</a></h5>
        </ul>
        </div>
      </div>
      <hr/>
      <div className="col-12 col-md text-center"><h5>© 2017-2018 kajebiii</h5></div>
      </footer>
    </div>
  )
}

export default PageTemplate
