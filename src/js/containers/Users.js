import React from 'react'
import { connect } from 'react-redux'
import { store } from 'state'
import ListContainer from 'components/ListContainer'
import Panel from 'components/Panel'

class Users extends React.Component {
  componentDidMount() {
    // store.dispatch(fetchMeetings())
  }

  filter(childItem, textFilter) {
    const test = childItem.props.children.trim().toLowerCase()
    const filter = textFilter.trim().toLowerCase()
    return test.includes(filter)
  }

  render() {
    return (
      <Panel title='Registrerade' newItemText='Nytt LiU-ID'>
        <ListContainer
          filter={this.filter}
          noItemsText='Inga personer hittades'
          style={this.props.style}
        >
          {[].map(a => <a>1</a>)}

          {/* {this.props.meetings.map(meeting => (
          <a
            // onClick={() => this.props.handleSelectMeetings(meeting.id)}
            key={meeting.id}
            className={`collection-item ${meeting.id === this.props.currentMeeting ? 'active' : ''}`}
            role='button'
            style={{ cursor: 'pointer' }}
          >
            {meeting.name}
          </a>
        ))} */}
        </ListContainer>
      </Panel>
    )
  }
}

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
)(Users)
