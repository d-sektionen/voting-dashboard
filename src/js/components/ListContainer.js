import React from 'react'
import TextInput from 'components/TextInput'

export default class ListContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      textFilter: '',
    }

    this.handleNewFilter = this.handleNewFilter.bind(this)
  }

  handleNewFilter(textFilter) {
    this.setState({ textFilter })
  }

  render() {
    const filteredItems = this.props.children.filter(item => {
      if (this.state.textFilter === '' || !this.props.filter) {
        return true
      }
      return this.props.filter(item, this.state.textFilter)
    })

    return (
      <React.Fragment>
        {this.props.filter &&
          <TextInput onChange={this.handleNewFilter} placeholder='Filter' />
        }
        {filteredItems.length > 0 ?
          <div className='collection list-collection'>
            {filteredItems}
          </div>
            :
          <p style={{ marginLeft: '7px' }}>{this.props.noItemsText}</p>
        }
      </React.Fragment>
    )
  }
}
