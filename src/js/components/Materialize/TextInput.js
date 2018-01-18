import React from 'react'
import M from 'materialize-css'

export default class TextInput extends React.Component {
  componentDidMount() {
    M.updateTextFields()
  }

  render() {
    return (
      <div className='input-field' style={styles}>
        <input id={this.props.id} type='text' className='validate' style={styles} />
        <label htmlFor={this.props.id}>{this.props.text}</label>
      </div>
    )
  }
}

const styles = {
  marginBottom: '0',
}
