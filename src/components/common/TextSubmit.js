import React from 'react'
import TextInput from 'components/common/TextInput'

export default class TextSubmit extends React.Component {
  state = {
    inputText: ''
  }

  handleTextChange = text => {
    this.setState({ inputText: text })
  }

  handleSubmit = event => {
    event.preventDefault()

    const inputText = this.state.inputText.trim()

    if (this.props.onSubmit && inputText !== '') {
      const success = this.props.onSubmit(inputText)

      if (success) {
        this.setState({ inputText: '' })
      }
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          value={this.state.inputText}
          label={this.props.label}
          placeholder={this.props.placeholder}
          pattern={this.props.pattern}
          onChange={this.handleTextChange}
        />
      </form>
    )
  }
}
