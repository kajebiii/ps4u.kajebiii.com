import React from 'react'

import { PageTemplate } from 'containers'
import { AtcoderGRBContest } from 'components'

const AtcoderPage = ( {atcoder_state, children, ...props}) => {
  const GRB_state = {}
  const GRB_tags = [['agc', 'AtCoder Grand Contest'], ['arc', 'AtCoder Regular Contest'], ['abc', 'AtCoder Beginner Contest']]
  GRB_tags.forEach( ([tag, title]) => {
    GRB_state[tag] = {
      title,
      problems: atcoder_state.problems.filter(problem => problem.id.startsWith(tag)),
      contests: atcoder_state.contests.filter(contest => contest.id.startsWith(tag)),
      users: Object.entries(atcoder_state.users).filter(([key,value]) => key.startsWith(tag)).map(([k,v]) => ({[k]:v})),
    }
  })
  return (
    <PageTemplate {...props}>
    <h1>Atcoder Problem Chest</h1>
    {/*<div><a href="{{url_for('atcoderModifyTranslate')}}">Modify Translate</a></div>*/}
    <label>show AGC</label><input type="checkbox" id="agc-check" defaultChecked></input>
    <label>show ARC</label><input type="checkbox" id="arc-check" defaultChecked></input>
    <label>show ABC</label><input type="checkbox" id="abc-check" defaultChecked></input>
    <label>Inverse</label><input type="checkbox" id="Inverse-check" defaultChecked></input>
    {/*<label>show Other</label><input type="checkbox" id="other-check" onClick="checkboxToShow()" defaultChecked>*/}
    {
      GRB_tags.map( ([tag, title]) => {
        return <AtcoderGRBContest key={tag} contests_state={GRB_state[tag]}/>
      })
    }
    {/*<div id="other-show"><table id="other-table"></table></div>*/}
    {children}
    </PageTemplate>
  )
}

export default AtcoderPage
