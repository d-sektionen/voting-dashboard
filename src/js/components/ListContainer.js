import React from 'react'

const listContainer = props => {
  let { children } = props

  if (props.filter) {
    children = children.filter(props.filter)
  }

  return (
    <React.Fragment>
      {children && children.length > 0 ?
        <div className='collection list-collection'>
          {children}
        </div>
        :
        <p style={{ marginLeft: '7px' }}>{props.noItemsText}</p>
      }
    </React.Fragment>
  )
}

export default listContainer
