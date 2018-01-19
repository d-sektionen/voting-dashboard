import React from 'react'
import { connect } from 'react-redux'
import { store, fetchMeetings } from 'state'
import ListContainer from 'components/ListContainer'

class Meetings extends React.Component {
  componentDidMount() {
    store.dispatch(fetchMeetings())
  }

  filter(childItem, textFilter) {
    return childItem.props.children.includes(textFilter.trim())
  }

  render() {
    return (
      <ListContainer filter={this.filter}>
        {this.props.meetings.map(meeting => (
          <a key={meeting.id} className='collection-item' disabled={meeting.archived}>{meeting.name}</a>
        ))}
      </ListContainer>
    )
  }
}

const mapStateToProps = state => ({
  meetings: state.meeting.list,
})

export default connect(mapStateToProps)(Meetings)
