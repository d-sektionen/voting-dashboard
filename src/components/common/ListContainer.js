import React from 'react'

export default props => (
  <div className='panel-list'>
    {
      props.children && props.children.length !== 0
        ? props.children
        : <span>{props.noItemsText}</span>
    }
  </div>
)
