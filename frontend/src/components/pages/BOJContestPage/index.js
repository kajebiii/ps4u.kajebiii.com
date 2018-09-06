import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { PageTemplate } from 'containers'

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

class BOJContestPage extends React.Component {
  constructor( props ){
    super(props)
    this.state = {
      'show_all_solve': true,
      'show_can_not_all_solve': true,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const id = target.id;
    this.setState({[id]: value});
  }
  render(){
    var {contests_with_problem_state, user_state, children, ...props} = this.props
    return (
      <PageTemplate {...props}>
      <h1>BOJ Contest Chest</h1>
      <label>show all solve</label>
      <input 
        type="checkbox" id="show_all_solve" 
        checked={this.state.show_all_solve} onChange={this.handleInputChange}>
      </input>
      <br/>
      <label>show can not all solve</label>
      <input 
        type="checkbox" id="show_can_not_all_solve" 
        checked={this.state.show_can_not_all_solve} onChange={this.handleInputChange}>
      </input>
      <Wrapper><div className="boj_problems">
      {
        contests_with_problem_state.map( (contest) => {
          const { id, title, parent_title, parent_id, problems } = contest
          return <div key={id}>
            <div className="d-flex justify-content-between">
              <h5><a href={"https://acmicpc.net/category/detail/"+id}>{title}</a></h5>
              <p className="font-weight-light"><a href={"https://acmicpc.net/category/"+parent_id}>{parent_title}</a></p>
            </div>
            <div className="d-flex justify-content-between">
            {
              problems.map( (problem) => {
                return (
                  <a key={problem} href={"https://acmicpc.net/problem/"+problem}
                     className={problem in user_state ? (user_state[problem] === "AC" ? "AC" : "WA") : "NONE"}>
                    {problem}
                  </a>
                )
              })
            }
            </div>
            <hr/>
          </div>
        })
      }
      </div></Wrapper>
      {children}
      </PageTemplate>
    )
  }
}

export default BOJContestPage
