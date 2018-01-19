import React from 'react'
import TextInput from 'components/Materialize/TextInput'
import FilterInput from 'components/Materialize/FilterInput'

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
    const filteredChildren = this.props.children.filter(child => {
      if (this.state.textFilter === '') {
        return true
      }
      return this.props.filter(child, this.state.textFilter)
    })


    return (
      <div className='card-panel' style={styles}>
        <div style={flex}>
          <h4 style={{ marginTop: 0 }}>Möten</h4>
          <div className='divider' />
          <FilterInput onChange={this.handleNewFilter} />
          {filteredChildren.length > 0 ?
            <div className='collection'>
              {filteredChildren}
            </div>
            :
            <p style={{ marginLeft: '7px' }}>Inga möten hittades</p>
          }
        </div>
        <div style={flex}>
          <TextInput text='Nytt möte' id='newMeeting' />
        </div>
      </div>
    )
  }
}

// Change this ugly flexbox shit to CSS grid when browser support is ok
const styles = {
  padding: '13px',
  minHeight: '600px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}

const flex = {
  flex: '0 1 auto',
}
