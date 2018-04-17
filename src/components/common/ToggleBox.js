import React from 'react'
import { randomID } from 'utils'

export default class ToggleBox extends React.Component {
  constructor (props) {
    super(props)

    this.id = randomID()
  }

  render () {
    return (
      <div className={`switch ${this.props.className}`}>
        <label>
          {this.props.offText}
          <input onChange={() => this.props.onChange(!this.props.value)} checked={this.props.value} type='checkbox' />
          <span className='lever' />
          {this.props.onText}
        </label>
      </div>
    )
  }
}
