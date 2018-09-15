import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

class TagListPage extends React.Component {
  constructor( props ){
    super(props)
  }
  render(){
    var {tag_list, children, ...props} = this.props
    return (
      <PageTemplate {...props}>
      <h1>Tag List Page</h1>

			<table className="table table-sm table-bordered table-condensed">
      <thead>
        <tr>
          <td>태그</td>
          <td>분류</td>
          <td>문제</td>
        </tr>
      </thead>
      <tbody>
      {
        tag_list.map(tag => {
          return <tr key={tag.id}>
            <td>{tag.abbreviation}</td>
            <td><Link to={props.location.pathname + '/' + tag.id}>{tag.name}</Link></td>
            <td>TODO</td>
          </tr>
        })
      }
      </tbody>
      </table>
      {children}
      </PageTemplate>
    )
  }
}

export default TagListPage
