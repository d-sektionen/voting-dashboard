import React from 'react'

export default props => (
  <a onClick={props.onClick} className={`collection-item ${props.className} ${props.active ? 'active' : ''}`}>
    {props.children}
  </a>
)
