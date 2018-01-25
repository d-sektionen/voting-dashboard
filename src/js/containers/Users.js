import React from 'react'
import { connect } from 'react-redux'
import { getUsers, addUser, removeUser, getScanners, addSacnner, removeScanner } from 'state'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'

const usersFilter = (childItem, textFilter) => {
  const test = childItem.props.children.toLowerCase()
  const filter = textFilter.trim().toLowerCase()
  return test.includes(filter)
}

const users = props => (
  <Panel title='Registrerade' newItemText='Nytt LiU-ID'>
    <ListContainer
      filter={usersFilter}
      noItemsText='Inga personer hittades'
    >
      {[].map(a => <a>1</a>)}

      {/* {props.meetings.map(meeting => (
          <a
            // onClick={() => props.handleSelectMeetings(meeting.id)}
            key={meeting.id}
            className={`collection-item ${meeting.id === props.currentMeeting ? 'active' : ''}`}
            role='button'
            style={{ cursor: 'pointer' }}
          >
            {meeting.name}
          </a>
        ))} */}
    </ListContainer>
  </Panel>
)


const mapStateToProps = state => ({
  users: state.users,
  scanners: state.scanners,
  currentMeeting: state.meeting.currentMeeting,
})

const mapDispatchToProps = dispatch => ({
  addUser: meetingText => 1, // dispatch(createMeeting(meetingText, section)),
  removeUser: meetingID => 1, // dispatch(setCurrentMeeting(meetingID)),
  addScanner: () => 1,
  removeScanner: () => 1,
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(users)
