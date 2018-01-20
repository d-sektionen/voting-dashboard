import React from 'react'
import { connect } from 'react-redux'
import { store } from 'state'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'

const usersFilter = (childItem, textFilter) => {
  const test = childItem.props.children.toLowerCase()
  const filter = textFilter.trim().toLowerCase()
  return test.includes(filter)
}

const users = props =>
  // console.log(props)

  (
    <Panel title='Registrerade' newItemText='Nytt LiU-ID'>
      <ListContainer
        filter={usersFilter}
        noItemsText='Inga personer hittades'
        style={props.style}
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
  // meetings: state.meeting.list,
  // currentMeeting: state.meeting.currentMeeting,
})

const mapDispatchToProps = dispatch =>
  // const { section } = store.getState()
  ({
    // handleAddMeeting: meetingText => dispatch(createMeeting(meetingText, section)),
    // handleSelectMeetings: meetingID => dispatch(setCurrentMeeting(meetingID)),
  })


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(users)
