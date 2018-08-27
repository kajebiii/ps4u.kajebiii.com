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

const getContestURL = (contest_id) => {return 'https://beta.atcoder.jp/contests/'+contest_id+'/'}
const getProblemURL = (contest_id, problem_id) => {return 'https://beta.atcoder.jp/contests/'+contest_id+'/tasks/'+problem_id+'/'}
const getHypertext = (href, content, blank) => {
	if(blank) 
		return <a href={href}>{content}</a>
	else
		return <a href={href} target="_blank">{content}</a>
}

const AtcoderGRBContest = ( {contests_state, children, ...props}) => {
	console.log(contests_state)
	const contests_row = {}
	contests_state.contests.forEach( contest => {
		contests_row[contest.id] = []
	})
	contests_state.problems.forEach( problem => {
		const contest_id = problem.id.substring(0, 6)
		contests_row[contest_id].push(problem)
	})
	let max_problem_count = 0
	for(const key in contests_row) {
		max_problem_count = Math.max(max_problem_count, contests_row[key].length)
	}

	const problems_by_score = {}
	contests_state.problems.forEach( problem => {
		const problem_score = ('point' in problem) ? problem.point : -1
		if(problem_score < 0) return
		if(!(problem_score in problems_by_score)) {
			problems_by_score[problem_score] = []
		}
		problems_by_score[problem_score].push(problem)
	})
	const problem_scores = Object.keys(problems_by_score)
	let max_row = 0
	problem_scores.forEach( score => {
		max_row = Math.max(max_row, problems_by_score[score].length)
	})
	/* Stable Sort
	let problems_sort_by_point = 
		contests_state.problems.map( (problem, index) => [problem, index])
		.sort((problem_a, problem_b) => {
			const point_diff = problem_a[0].point - problem_b[0].point
			if(point_diff != 0) return point_diff
			return problem_a[1] - problem_b[1]
		})
		.map( ([problem, index]) => problem)
	*/
	
	return (
		<Wrapper {...props}>
			<h2>{contests_state.title}</h2>
			<table className="table grbtable table-sm table-bordered table-condensed text-center">
			<thead>
				<tr>
					<td>Contest Id</td>
					{
						Array.from({length: max_problem_count}, (v, k) => k).map( count => {
							return <td key={count}>{String.fromCharCode('A'.charCodeAt() + count)}</td>
						})
					}
				</tr>
			</thead>
			<tbody>
				{
					contests_state.contests.map( contest => {
						return (
							<tr key={contest.id}>
								<td>{getHypertext(getContestURL(contest.id), contest.id, true)}</td>
								{
									contests_row[contest.id].map( problem => {
										return <td key={problem.id}>{getHypertext(getProblemURL(contest.id, problem.id), problem.title, true)}</td>
									})
								}
							</tr>
						)
					})
				}
			</tbody>
			</table>

			<h3>{contests_state.title} (Score)</h3>
			<table className="table grbtable table-sm table-bordered table-condensed text-center">
			<thead>
				<tr>
					{
						problem_scores.map( score => {
							return <td key={score}>{score}</td>
						})
					}
				</tr>
			</thead>
			<tbody>
				{
					Array.from({length: max_row}, (v, k) => k).map( row_cnt => {
						return (
						<tr key={row_cnt}>
						{
						problem_scores.map( score => {
							if(!(problems_by_score[score].length > row_cnt)) return <td key={"None"+score+"-"+row_cnt}></td>
							let problem = problems_by_score[score][row_cnt]
							return <td key={problem.id}>{getHypertext(getProblemURL(problem.id.substring(0, 6), problem.id), problem.id.substring(3), true)}</td>
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
