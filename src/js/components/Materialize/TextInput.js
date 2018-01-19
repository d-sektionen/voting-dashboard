import React from 'react'
import M from 'materialize-css'
import { randomID } from 'utils'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)

    this.id = randomID()
  }

  componentDidMount() {
    M.updateTextFields()
  }

  render() {
    return (
      <div className='input-field' style={styles}>
        <input id={this.id} type='text' />
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
