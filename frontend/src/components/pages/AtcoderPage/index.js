import React from 'react'

import { PageTemplate } from 'components'

const AtcoderPage = ( {atcoder_state, children, ...props}) => {
  return (
    <PageTemplate {...props}>
    <h1>Atcoder Problem Chest</h1>
    {/*<div><a href="{{url_for('atcoderModifyTranslate')}}">Modify Translate</a></div>*/}
    <label>show AGC</label><input type="checkbox" id="agc-check" defaultChecked></input>
    <label>show ARC</label><input type="checkbox" id="arc-check" defaultChecked></input>
    <label>show ABC</label><input type="checkbox" id="abc-check" defaultChecked></input>
    <label>Inverse</label><input type="checkbox" id="Inverse-check" defaultChecked></input>
    {/*<label>show Other</label><input type="checkbox" id="other-check" onClick="checkboxToShow()" defaultChecked>*/}
    <div id="agc-show"><table id="agc-table"></table></div>
    <div id="arc-show"><table id="arc-table"></table></div>
    <div id="abc-show"><table id="abc-table"></table></div>
    {/*<div id="other-show"><table id="other-table"></table></div>*/}
    {children}
    </PageTemplate>
  )
}

export default AtcoderPage
