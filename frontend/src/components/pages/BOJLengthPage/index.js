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

class BOJLengthPage extends React.Component {
  constructor( props ){
    super(props)
    this.state = {'show_solve': true}
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.checked;
    const id = target.id;
    this.setState({[id]: value});
  }
  render(){
    var {user_state, problems_sort_by_length, children, ...props} = this.props
    return (
      <PageTemplate {...props}>
      <h1>BOJ Length Chest</h1>
      <label>show_solve</label>
      <input 
        type="checkbox" id="show_solve" 
        checked={this.state.show_solve} onChange={this.handleInputChange}>
      </input>
      <br/>
      <Wrapper><div className="boj_problems">
      {
        Array.from({length: problems_sort_by_length.problems.length}, (v, k) => k).map( index => {
          const problem = problems_sort_by_length.problems[index]
          const description_length = problems_sort_by_length.description_lengths[index]
          if(!this.state.show_solve && problem in user_state && user_state[problem] === "AC") return
          return <span key={index}>
            <a target="_blank" className={
              problem in user_state ? (user_state[problem] === "AC" ? "AC" : "WA") : "NONE"
            } href={'https://acmicpc.net/problem/'+problem}>{problem}</a>
            <span>({description_length} B) </span>
            {/* this blank is very important!! */}
          </span>
        })
      }
      </div></Wrapper>
      {children}
      </PageTemplate>
    )
  }
}

export default BOJLengthPage
