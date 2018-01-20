import React from 'react'
import { connect } from 'react-redux'
import { store, createMeeting, setCurrentMeeting } from 'state'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'

const meetingFilter = (childItem, textFilter) => {
  const test = childItem.props.children.toLowerCase()
  const filter = textFilter.trim().toLowerCase()
  return test.includes(filter)
}

const meetings = props => (
  <Panel
    title='Möten'
    newItemText='Nytt möte'
    onAddItem={name => props.addMeeting(name, props.section)}
  >
    <ListContainer
      filter={meetingFilter}
      noItemsText='Inga möten hittades'
      style={props.style}
    >
      {props.meetings.map(meeting => (
        <a
          onClick={() => props.selectMeetings(meeting.id)}
          key={meeting.id}
          className={`collection-item ${meeting.id === props.currentMeeting ? 'active' : ''}`}
          role='button'
          style={{ cursor: 'pointer' }}
        >
          {meeting.name}
        </a>
        ))}
    </ListContainer>
  </Panel>
)

const mapStateToProps = state => ({
  currentMeeting: state.meeting.currentMeeting,
  meetings: state.meeting.list,
  section: state.section,
})

const mapDispatchToProps = dispatch => ({
  addMeeting: (meetingText, section) => dispatch(createMeeting(meetingText, section)),
  selectMeetings: meetingID => dispatch(setCurrentMeeting(meetingID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(meetings)
