import React from 'react'
import { Field, reduxForm } from 'redux-form'

let HandleLoginForm = props => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field name="boj" component="input" placeholder="BOJ ID" type="text"/>
      <Field name="atcoder" component="input" placeholder="Atcoder ID" type="text"/>
      <button type="submit">추가</button>
    </form>
  )
}

HandleLoginForm = reduxForm({
  form: 'handle'
})(HandleLoginForm)

export default HandleLoginForm