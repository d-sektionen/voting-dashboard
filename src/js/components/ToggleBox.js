import React from 'react'
import M from 'materialize-css'
import { randomID } from 'utils'

export default class ToggleBox extends React.Component {
  constructor(props) {
    super(props)

    this.id = randomID()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    M.updateTextFields()
  }

  onChange(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div className='input-field'>
        <input onChange={this.onChange} id={this.id} value={this.props.value} type='text' />
        <label htmlFor={this.id}>{this.props.text}</label>
      </div>
    )
  }
}
