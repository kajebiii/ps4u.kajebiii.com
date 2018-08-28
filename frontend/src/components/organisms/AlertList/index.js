import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'
import { Link } from 'react-router'

import { Page, CurrPage, ArticleTable, Input, Button } from 'components'

class AlertList extends React.Component {
  constructor( props ){
    super(props)
  }
  componentDidMount(){
    //this.props.get_articles(this.props.lecture_id, this.props.cur_page)
  }
  componentWillReceiveProps(nextProps) {
    //if(nextProps.cur_page == this.props.cur_page && nextProps.lecture_id == this.props.lecture_id) return;
    //this.props.get_articles(nextProps.lecture_id, nextProps.cur_page)
  }
  render(){
    var {alert_state, ...props} = this.props
    return (
      <div {...props} style={{'position': 'fixed', 'bottom': '0', 'right': '0'}}>
        {(alert_state.messages).map( (message, index) =>      
          <div style={{'backgroundColor': '#f0f0f0f0', 'width': '320px', 'padding': '24px', 'margin': '12px', 
          'border': '1px solid #aaa', 'color': '#333', 'borderRadius': '.5rem', 'textAlign': 'center'}} key={index}>{message}</div>
        )}
      </div>
    )
  }
}

AlertList.propTypes = {
  reverse: PropTypes.bool,
}

export default AlertList
