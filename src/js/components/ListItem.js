import React from 'react'
import classNames from 'classnames'

export default props => (
  <li
    onClick={props.onClick}
    className={classNames('collection-item', { active: props.active })}
  >
    {props.children}
  </li>
)
