import React from 'react'
import M from 'materialize-css'

export default class TextInput extends React.Component {
  constructor(props) {
    super(props)

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
        <input type='text' placeholder='Filtrera' onChange={this.onChange} />
      </div>

    )
  }
}

const styles = {
  marginBottom: '0',
  padding: '0 7px',
}
