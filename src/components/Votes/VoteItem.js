import React from 'react'

export default props => (
  <a className='collection-item'>
    <span className='vote-item' onClick={props.onClick}>
      {props.question}
    </span>
    <a onClick={props.onEdit} title='Redigera omröstning' className='secondary-content user-item'>
      <i className='material-icons'>edit</i>
    </a>
  </a>
)
