import React from 'react'
import { connect } from 'react-redux'
import { store, createMeeting, setCurrentMeeting } from 'state'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
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
    onAddItem={name => props.createMeeting(name, props.section)}
  >
    <ListContainer
      filter={meetingFilter}
      noItemsText='Inga möten hittades'
      style={props.style}
    >
      {
        props.meetings.filter(meeting => meeting.section === props.section)
          .map(meeting => (
            <ListItem
              active={meeting.id === props.currentMeeting}
              onClick={() => props.setCurrentMeeting(meeting.id)}
              key={`meeting${meeting.id}`}
            >
              {meeting.name}
            </ListItem>
        ))
      }
    </ListContainer>
  </Panel>
)

const mapStateToProps = state => ({
  currentMeeting: state.meeting.current,
  meetings: state.meeting.all,
  section: state.section,
})

const mapDispatchToProps = dispatch => ({
  createMeeting: (meetingText, section) => dispatch(createMeeting(meetingText, section)),
  setCurrentMeeting: meetingID => dispatch(setCurrentMeeting(meetingID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(meetings)
