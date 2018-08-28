import React from 'react'

import { PageTemplate } from 'containers'
import { AtcoderGRBContest } from 'components'


class AtcoderPage extends React.Component {
  constructor( props ){
    super(props)
    this.state = {
      'show_agc': true,
      'show_arc': true,
      'show_abc': true,
      'inverse': true,
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
    var {atcoder_state, children, ...props} = this.props
    const GRB_state = {}
    const GRB_tags = [['agc', 'AtCoder Grand Contest'], ['arc', 'AtCoder Regular Contest'], ['abc', 'AtCoder Beginner Contest']]
    GRB_tags.forEach( ([tag, title]) => {
      const users_tag = Object.entries(atcoder_state.users).filter(([key,value]) => key.startsWith(tag)).map(([k,v]) => ({[k]:v}))
      GRB_state[tag] = {
        title,
        problems: atcoder_state.problems.filter(problem => problem.id.startsWith(tag)),
        contests: atcoder_state.contests.filter(contest => contest.id.startsWith(tag)),
        users: users_tag.length > 0 ? Object.assign(...users_tag) : {}
      }
    })
    return (
      <PageTemplate {...props}>
      <h1>Atcoder Problem Chest</h1>
      {/*<div><a href="{{url_for('atcoderModifyTranslate')}}">Modify Translate</a></div>*/}
      <label>show AGC</label><input type="checkbox" id="show_agc" checked={this.state.show_agc} onChange={this.handleInputChange}></input>
      <label>show ARC</label><input type="checkbox" id="show_arc" checked={this.state.show_arc} onChange={this.handleInputChange}></input>
      <label>show ABC</label><input type="checkbox" id="show_abc" checked={this.state.show_abc} onChange={this.handleInputChange}></input>
      <label>Inverse</label> <input type="checkbox" id="inverse"  checked={this.state.inverse}  onChange={this.handleInputChange}></input>
      {/*<label>show Other</label><input type="checkbox" id="other-check" onClick="checkboxToShow()" defaultChecked>*/}
      {
        GRB_tags.map( ([tag, title]) => {
          if(this.state['show_'+tag] == false) return
          return <AtcoderGRBContest key={tag} inverse={this.state.inverse} contests_state={GRB_state[tag]}/>
        })
      }
      {/*<div id="other-show"><table id="other-table"></table></div>*/}
      {children}
      </PageTemplate>
    )
  }
}

export default AtcoderPage
