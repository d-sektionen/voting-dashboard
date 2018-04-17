import React from 'react'

export default props => (
  <a className='collection-item'>
    {
      props.user.first_name !== ''
        ? `${props.user.first_name} ${props.user.last_name} (${props.user.username})`
        : props.user.username
    }
    <a onClick={props.onRemove} title={props.removeString} className='secondary-content red-text user-item'>
      <i className='material-icons'>delete</i>
    </a>
  </a>
)
