import React from 'react'

const listContainer = props => {
  let { children, filter } = props

  if (filter) {
    children = children.filter(filter)
  }

  return (
    <React.Fragment>
      {children && children.length > 0
        ? <div className='collection list-collection'>
          {children}
        </div>
        : <p style={{ marginLeft: '7px' }}>{props.noItemsText}</p>
      }
    </React.Fragment>
  )
}

export default listContainer
