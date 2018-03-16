import React from 'react'
import classNames from 'classnames'
import { randomID } from 'utils'

export default class ToggleBox extends React.Component {
  constructor(props) {
    super(props)

    this.id = randomID()
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(!this.props.value)
    }
  }

  render() {
    return (
      <div className={classNames('switch', this.props.className)}>
        <label>
          {this.props.offText}
          <input onChange={this.onChange} checked={this.props.value} type='checkbox' />
          <span className='lever' />
          {this.props.onText}
        </label>
      </div>
    )
  }
}
