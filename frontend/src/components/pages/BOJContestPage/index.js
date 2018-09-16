import React from 'react'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { PageTemplate } from 'containers'
import { Field, reduxForm } from 'redux-form'


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
let BOJContestSearchForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <label>show all solve</label>
      <Field component="input" type="checkbox" name="show_all_solve"/>
      <br/>
      <label>show can not all solve</label>
      <Field component="input" type="checkbox" name="show_can_not_all_solve"/>
      <br/>
      <Field component="input" type="text" name="search"  />

      <button type="submit">검색</button>
    </form>
  )
}

const initialState = {
  'show_all_solve': true,
  'show_can_not_all_solve': true,
  'search': "",
}

BOJContestSearchForm = reduxForm({
  form: 'BOJContestSearch',
  initialValues: initialState
})(BOJContestSearchForm)

let getValueOrGiven = (dict, key, given) => (key in dict ? dict[key] : given)

class BOJContestPage extends React.Component {
  constructor( props ){
    super(props)
    this.state = initialState
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    this.setState({[id]: value});
  }
  send_handle = values => {
    this.setState({
      'show_all_solve': getValueOrGiven(values, "show_all_solve", false),
      'show_can_not_all_solve': getValueOrGiven(values, "show_can_not_all_solve", false),
      'search': getValueOrGiven(values, "search", ""),
    });
  }
  render(){
    var {contests_with_problem_state, user_state, children, ...props} = this.props
    return (
      <PageTemplate {...props}>
      <h1>BOJ Contest Chest</h1>
      <BOJContestSearchForm onSubmit={this.send_handle} defaultValue={this.state}/>
      <Wrapper><div className="boj_problems">
      {
        contests_with_problem_state.map( (contest) => {
          const { id, title, parent_title, parent_id, problems } = contest
          if(!this.state.show_all_solve && problems.length > 0) {
            let ac_count = 0
            problems.forEach( problem => {
              if(problem in user_state && user_state[problem] === "AC") ac_count = ac_count + 1
            })
            if(ac_count == problems.length) return
          }
          if(!this.state.show_can_not_all_solve && problems.length == 0) return
          if(title.indexOf(this.state.search) == -1 && parent_title.indexOf(this.state.search) == -1) return
          return <div key={id}>
            <div className="d-flex justify-content-between">
              <h5><a target="_blank" href={"https://acmicpc.net/category/detail/"+id}>{title}</a></h5>
              <p className="font-weight-light"><a href={"https://acmicpc.net/category/"+parent_id}>{parent_title}</a></p>
            </div>
            <div className="d-flex justify-content-between">
            {
              problems.map( (problem) => {
                return (
                  <a target="_blank" key={problem} href={"https://acmicpc.net/problem/"+problem}
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
