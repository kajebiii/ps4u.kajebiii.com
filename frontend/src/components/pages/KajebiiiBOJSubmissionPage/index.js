import React from 'react'

import { PageTemplate } from 'containers'
import { Link } from 'react-router'

const KajebiiiBOJSubmissionPage = ( {kajebiii_ac_problems, children, ...props}) => {
  return (
    <PageTemplate {...props}>
    <h1>kajebiii AC Problem List in BOJ</h1>
    {
      kajebiii_ac_problems.map(problem => {
        return <Link key={problem} to={props.location.pathname + '/' + problem}>{problem} </Link> /* this blank is very important!! */
      })
    }
    {children}
    </PageTemplate>
  )
}

export default KajebiiiBOJSubmissionPage
