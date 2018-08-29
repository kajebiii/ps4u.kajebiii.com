import React from 'react'
import ReactMarkdown from 'react-markdown';

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
        <Link to={'/kajebiii/boj'}>문제 목록</Link>
        <h1>kajebiii BOJ {this.props.params.boj_problem} Source Code</h1>
        <a href={'https://acmicpc.net/problem/'+this.props.params.boj_problem}>본 문제 링크</a>
        <ReactMarkdown source={'```\n'+boj_source+'\n```'}/>
        {children}
      </PageTemplate>
    )
  }
}

export default KajebiiiBOJCodePage
