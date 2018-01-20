import React from 'react'
import classNames from 'classnames'

export default props => (
  <a
    onClick={props.onClick}
    className={classNames('collection-item', { active: props.active })}
    role='button'
    style={{ cursor: 'pointer' }}
  >
    {props.children}
  </a>
)
