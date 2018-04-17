import React from 'react'
import M from 'materialize-css'
import { randomID } from 'utils'

export default class TextInput extends React.Component {
  constructor (props) {
    super(props)

    this.id = randomID()
  }

  componentDidMount () {
    M.updateTextFields()
  }

  onChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  }

  render () {
    return (
      <div className={`input-field text-input ${this.props.inline ? 'inline' : ''}`}>
        <input
          onChange={this.onChange}
          id={this.id}
          value={this.props.value}
          placeholder={this.props.placeholder}
          type='text'
          autoComplete='off'
          pattern={this.props.pattern}
        />
        {this.props.text &&
          <label htmlFor={this.id} className='text-label'>{this.props.text}</label>
        }
      </div>
    )
  }
}
