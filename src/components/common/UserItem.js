import React from 'react'

export default props => (
  <button className='user-item'>
    <span>
      {
        props.user.first_name !== ''
          ? `${props.user.first_name} ${props.user.last_name} (${props.user.username})`
          : props.user.username
      }
    </span>
    <span className='material-icons' onClick={props.onRemove} title={props.removeString}>
      delete
    </span>
  </button>
)
