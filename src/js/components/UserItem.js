import React from 'react'

const userItem = props => (
  <li
    key={`user${props.user.user.id}`}
    className='collection-item user-item'
  >
    {
    props.user.user.first_name !== '' ?
      `${props.user.user.first_name} ${props.user.user.last_name} (${props.user.user.username})`
      :
      props.user.user.username
    }
    <i className='material-icons right' style={{ marginLeft: 0 }}>
      <span style={{ marginRight: '6px' }} />
      <a
        onClick={() => props.remove(props.user.id)}
        title={props.removeString}
        style={{ color: '#E53935', cursor: 'pointer' }}
        role='button'
      >
        clear
      </a>
    </i>
  </li>
)

export default userItem
