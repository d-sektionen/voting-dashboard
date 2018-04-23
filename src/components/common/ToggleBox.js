import React from 'react'

export default props => {
  // console.log('FROM TOGGLE BOX', props.value)

  return (
    <label>
      <input checked={props.value} onChange={event => props.onChange(event.target.checked)} type='checkbox' />
      <span className='label-body'>{props.text}</span>
    </label>
  )
}
