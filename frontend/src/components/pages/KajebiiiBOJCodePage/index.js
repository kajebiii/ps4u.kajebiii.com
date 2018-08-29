import React from 'react'

import { PageTemplate } from 'containers'
import { Link } from 'react-router'


class KajebiiiBOJCodePage extends React.Component {
  constructor( props ){
    super(props)
  }
  componentDidMount(){
    this.props.get_boj_source(this.props.params.boj_problem)
  }
  render(){
    var { boj_source, children, ...props } = this.props
    return (
      <PageTemplate {...props}>
        <h1>KajebiiiBOJCodePage</h1>
        <p>{boj_source}</p>
        {children}
      </PageTemplate>
    )
  }
}

export default KajebiiiBOJCodePage
