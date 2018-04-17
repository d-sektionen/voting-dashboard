import React from 'react'

export default props => (
  <React.Fragment>
    {props.children && props.children.length > 0
      ? <div className='collection list-collection'>
        {props.children}
      </div>
      : <p>{props.noItemsText}</p>
    }
  </React.Fragment>
)
