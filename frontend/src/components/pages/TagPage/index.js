import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

const Wrapper = styled.div`
font-family: ${font('primary')};
color: ${palette('grayscale', 0)};

.boj_problems a.NONE{
  color: #0076C0;
}
.boj_problems a.AC{
  color: #009F6B;
  font-weight: bold;
}
.boj_problems a.WA{
	color: #e74c3c;
}
`

class TagPage extends React.Component {
  constructor( props ){
    super(props)
  }
  componentDidMount(){
    this.props.get_tag_information(this.props.params.tag_id)
  }
  render(){
    var {tag_information, user_state, children, ...props} = this.props
    return (
      <PageTemplate {...props}>
      <h1>Tag Page</h1>
      <h2>{tag_information.name}</h2>
      <Wrapper>
			<table className="table table-sm table-bordered table-condensed">
      <thead>
        <tr>
          <td>출처</td>
          <td>문제</td>
        </tr>
      </thead>
      <tbody className="boj_problems">
      {
        tag_information.boj.map(info => {
          return <tr key={info}>
            <td>BOJ</td>
            <td><a target="_blank" href={"https://acmicpc.net/problem/"+info}
                className={info in user_state ? (user_state[info] === "AC" ? "AC" : "WA") : "NONE"}>
              {info}
            </a></td>
          </tr>
        })
      }
      </tbody>
      </table>
      </Wrapper>
      {children}
      </PageTemplate>
    )
  }
}

export default TagPage
