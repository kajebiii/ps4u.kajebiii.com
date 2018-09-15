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
      <h3><Link to="/tag">목록</Link></h3>
      <h2>{tag_information.name}</h2>
      <Wrapper>
			<table className="table table-sm table-bordered table-condensed">
      <thead>
        <tr>
          <td>출처</td>
          <td>문제</td>
          <td>생각</td>
          <td>구현</td>
        </tr>
      </thead>
      <tbody className="boj_problems">
      {
        tag_information.boj.map(info => {
          const problem = info[0]
          const thinking_rating = info[1]
          const implement_rating = info[2]
          return <tr key={problem}>
            <td>BOJ</td>
            <td><a target="_blank" href={"https://acmicpc.net/problem/"+problem}
                className={problem in user_state ? (user_state[problem] === "AC" ? "AC" : "WA") : "NONE"}>
              {problem}
            </a></td>
            <td>{thinking_rating}</td>
            <td>{implement_rating}</td>
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
