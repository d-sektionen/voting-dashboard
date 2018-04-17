import React from 'react'

export default props => (
  <div className='card-panel'>
    <h5 className='center panel-header'>{props.title}</h5>
    <div className='divider' />
    {props.children}
  </div>
)
