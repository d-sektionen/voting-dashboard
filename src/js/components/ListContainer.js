import React from 'react'
import TextInput from 'components/Materialize/TextInput'
import FilterInput from 'components/Materialize/FilterInput'

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      textFilter: '',
      newItemText: '', // newItemText
    }

    this.handleNewFilter = this.handleNewFilter.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNewFilter(textFilter) {
    this.setState({ textFilter })
  }

  handleTextChange(newItemText) {
    this.setState({ newItemText })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onAddItem(this.state.newItemText)
    this.setState({ newItemText: '' })
  }

  render() {
    const filteredItems = this.props.children.filter(item => {
      if (this.state.textFilter === '' || !this.props.filter) {
        return true
      }
      return this.props.filter(item, this.state.textFilter)
    })

    return (
      <div className='card-panel' style={panelStyles}>
        <div style={flex}>
          <h4 style={{ marginTop: 0 }}>Möten</h4>
          <div className='divider' />
          <FilterInput onChange={this.handleNewFilter} />
          {filteredItems.length > 0 ?
            <div className='collection' style={collectionStyles}>
              {filteredItems}
            </div>
            :
            <p style={{ marginLeft: '7px' }}>{this.props.noItemsText}</p>
          }
        </div>
        <div style={flex}>
          <form onSubmit={this.handleSubmit}>
            <TextInput onChange={this.handleTextChange} value={this.state.newItemText} text='Nytt möte' />
          </form>
        </div>
      </div>
    )
  }
}

// Change this ugly flexbox shit to CSS grid when browser support is acceptable
const panelStyles = {
  padding: '13px',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}

const collectionStyles = {
  maxHeight: '547px',
  overflowY: 'auto',
}

const flex = {
  flex: '0 1 auto',
}
