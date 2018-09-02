import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { PageTemplate } from 'containers'

const Wrapper = styled.div`
font-family: ${font('primary')};
color: ${palette('grayscale', 0)};

.bojtable td.AC{
	background-color: #dff0d8;
}
.bojtable td.WA{
	background-color: #fcf8e3;
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
    var {contest_with_problem_state, user_state, children, ...props} = this.props
    console.log(contest_with_problem_state)
    console.log(user_state)
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
      {
        Object.keys(contest_with_problem_state).map( (title) => {
          var { id, parent_title, parent_id, problems } = contest_with_problem_state[title]
          return <Wrapper key={id}>
            <div className="d-flex justify-content-between">
              <h5><a href={"https://acmicpc.net/category/detail/"+id}>{title}</a></h5>
              <p className="font-weight-light"><a href={"https://acmicpc.net/category/"+parent_id}>{parent_title}</a></p>
            </div>
            <table className="bojtable table table-sm table-bordered text-center"><tbody><tr>
            {
              problems.map( (problem) => {
                if(problem in user_state) {
                  const result = user_state[problem]
                  if(result === "AC")
                    return <td className="AC" key={problem}><a href={"https://acmicpc.net/category/problem/"+problem}>{problem}</a></td> 
                  return <td className="WA" key={problem}><a href={"https://acmicpc.net/category/problem/"+problem}>{problem}</a></td> 
                }
                return <td key={problem}><a href={"https://acmicpc.net/category/problem/"+problem}>{problem}</a></td>
              })
            }
            </tr></tbody></table>
          </Wrapper>
        })
      }
      {/*
        GRB_tags.map( ([tag, title]) => {
          if(this.state['show_'+tag] == false) return
          return <AtcoderGRBContest key={tag} inverse={this.state.inverse} contests_state={GRB_state[tag]}/>
        })
      */}
      {children}
      </PageTemplate>
    )
  }
}

export default BOJContestPage
