import React from 'react'
import TextInput from 'components/TextInput'


export default class TextSubmit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: '',
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(text) {
    this.setState({ inputText: text })
  }

  handleSubmit(event) {
    event.preventDefault()

    const inputText = this.state.inputText.trim()

    if (this.props.onSubmit && inputText !== '') {
      if (this.props.onSubmit(inputText)) {
        this.setState({ inputText: '' })
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextInput
          value={this.state.inputText}
          text={this.props.text}
          pattern={this.props.pattern}
          onChange={this.handleTextChange}
        />
      </form>
    )
  }
}
