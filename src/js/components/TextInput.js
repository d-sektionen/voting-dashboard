import React from 'react'
import M from 'materialize-css'
import classNames from 'classnames'
import { randomID } from 'utils'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.id = randomID()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    M.updateTextFields()
  }

  onChange(event) {
    if (this.props.onChange) {
      this.props.onChange(event.target.value)
    }
  }

  render() {
    return (
      <div className={classNames('input-field', 'text-input', { inline: this.props.inline })}>
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
