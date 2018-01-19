import React from 'react'
import M from 'materialize-css'

export default class TextInput extends React.Component {
  componentDidMount() {
    M.updateTextFields()
  }

  render() {
    return (
      <div className='input-field' style={styles}>
        <input type='text' placeholder='Filtrera' onChange={(e) => this.props.onChange(e.target.value)} />
      </div>

    )
  }
}

const styles = {
  marginBottom: '0',
  padding: '0 7px',
}
