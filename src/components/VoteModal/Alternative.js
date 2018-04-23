import React from 'react'

export default props => (
  <React.Fragment>
    {
      props.label &&
      <label htmlFor={props.id}>{props.label}</label>
    }
    <div className='alternative'>
      <input
        onChange={event => props.onChange(event.target.value)}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        type='text'
        autoComplete='off'
        pattern={props.pattern}
      />
      <button
        title='Ta bort alternativ'
        className='primary-button material-icons' tabIndex='-1'
        onClick={props.onDelete}>
        clear
      </button>
    </div>
  </React.Fragment>
)
