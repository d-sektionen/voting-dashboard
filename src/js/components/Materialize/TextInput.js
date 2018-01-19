import React from 'react'
import M from 'materialize-css'
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
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div className='input-field' style={styles}>
        <input onChange={this.onChange} id={this.id} value={this.props.value} type='text' />
        <label htmlFor={this.id} style={labelStyles}>{this.props.text}</label>
      </div>
    )
  }
}

const styles = {
  marginBottom: '0',
  padding: '0 7px',
}

const labelStyles = {
  left: '7px',
}
