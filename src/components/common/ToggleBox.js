import React from 'react'

export default props => (
  <React.Fragment>
    <label>
      <input onChange={() => props.onChange(!props.value)} checked={props.value} type='checkbox' />
      <span className='label-body'>{props.text}</span>
    </label>
  </React.Fragment>
)
