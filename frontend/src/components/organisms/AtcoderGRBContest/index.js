import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { font, palette } from 'styled-theme'

import { SignOut } from 'components'
import { SignIn } from 'components'

const Wrapper = styled.div`
font-family: ${font('primary')};
color: ${palette('grayscale', 0)};

table.grbtable {
	table-layout:fixed;
}
.grbtable td{
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.absolute-right{
	position: absolute;
	top: 0px;
	right: 0px;
}
.grbtable td.AC{
	background-color: #dff0d8;
}
.grbtable td.WA{
	background-color: #fcf8e3;
}
`


const AtcoderGRBContest = ( {contests_state, children, ...props}) => {
	let contests_row = {}
	contests_state.contests.forEach( contest => {
		contests_row[contest.id] = []
	})
  contests_state.problems.forEach( problem => {
    let contest_id = problem.id.substring(0, 6)
    contests_row[contest_id].push(problem)
	})
	let maxProblemCount = 0
	for(let key in contests_row) {
		maxProblemCount = Math.max(maxProblemCount, contests_row[key].length)
	}
  return (
    <Wrapper {...props}>
      <h2>{contests_state.title}</h2>
      <table className="table grbtable table-sm table-bordered table-condensed text-center">
      <thead>
        <tr>
					<td>Contest Id</td>
					{
						Array.from({length: maxProblemCount}, (v, k) => k).map( count => {
							return <td key={count}>{String.fromCharCode('A'.charCodeAt() + count)}</td>
						})
					}
				</tr>
      </thead>
      <tbody>
				{
					contests_state.contests.map( contest => {
						return (
							<tr>
								<td>{contest.id}</td>
								{
									contests_row[contest.id].map( problem => {
										return <td>{problem.title}</td>
									})
								}
							</tr>
						)
					})
				}
      </tbody>
      </table>
      {children}
    </Wrapper>
  )
}

AtcoderGRBContest.propTypes = {
}

export default AtcoderGRBContest
