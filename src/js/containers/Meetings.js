import React from 'react'
import { connect } from 'react-redux'
import { store, fetchMeetings, createMeeting } from 'state'
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
      <ListContainer filter={this.filter} noItemsText='Inga möten hittades' onAddItem={this.props.handleAddItem}>
        {this.props.meetings.map(meeting => (
          <a key={meeting.id} className='collection-item'>{meeting.name}</a>
        ))}
      </ListContainer>
    )
  }
}

const mapStateToProps = state => ({
  meetings: state.meeting.list,
  currentMeeting: state.meeting.currentMeeting,
})

const mapDispatchToProps = dispatch => {
  const { section } = store.getState()
  return {
    handleAddItem: meetingText => dispatch(createMeeting(meetingText, section)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetings)
