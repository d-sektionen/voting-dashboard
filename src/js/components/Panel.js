import React from 'react'
import TextInput from 'components/Materialize/TextInput'

export default class Panel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      newItemText: '',
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(newItemText) {
    this.setState({ newItemText })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.state.newItemText === '') {
      return
    }

    this.props.onAddItem(this.state.newItemText)
    this.setState({ newItemText: '' })
  }

  render() {
    return (
      <div className='card-panel panel'>
        <div>
          {this.props.title &&
            <React.Fragment>
              <h4 className='center panel-header'>{this.props.title}</h4>
              <div className='divider' />
            </React.Fragment>
          }
          {this.props.children}
        </div>
        <form onSubmit={this.handleSubmit}>
          <TextInput onChange={this.handleTextChange} value={this.state.newItemText} text={this.props.newItemText} />
        </form>
      </div>
    )
  }
}
