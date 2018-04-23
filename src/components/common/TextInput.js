import React from 'react'

export default props => (
  <React.Fragment>
    {
      props.label &&
      <label htmlFor={props.id}>{props.label}</label>
    }
    <input
      onChange={event => props.onChange(event.target.value)}
      id={props.id}
      value={props.value}
      placeholder={props.placeholder}
      type='text'
      autoComplete='off'
      pattern={props.pattern}
    />
  </React.Fragment>
)
