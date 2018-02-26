import React from 'react'
import { connect } from 'react-redux'
import { store, createMeeting, setCurrentMeeting } from 'state'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
import Panel from 'components/Panel'

class Meetings extends React.Component {
  componentDidMount() {
    if (this.props.token) {
      this.props.getMeetings()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token && this.props.meetings.length === 0) {
      this.props.getMeetings()
    }
  }

  render() {
    return (
      <Panel
        title='Möten'
        newItemText='Nytt möte'
        onAddItem={name => this.props.createMeeting(name, this.props.section)}
      >
        <ListContainer
          noItemsText='Inga möten hittades'
          style={this.props.style}
        >
          {
          this.props.meetings.filter(meeting => meeting.section === this.props.currentSection)
            .map(meeting => (
              <ListItem
                active={meeting.id === this.props.currentMeeting}
                onClick={() => this.props.setCurrentMeeting(meeting.id)}
                key={`meeting${meeting.id}`}
              >
                {meeting.name}
              </ListItem>
            ))
          }
        </ListContainer>
      </Panel>
    )
  }
}

const mapStateToProps = state => ({
  currentMeeting: state.meeting.current,
  meetings: state.meeting.all,
  currentSection: state.user.currentSection,
})

const mapDispatchToProps = dispatch => ({
  createMeeting: (meetingText, section) => dispatch(createMeeting(meetingText, section)),
  setCurrentMeeting: meetingID => dispatch(setCurrentMeeting(meetingID)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetings)
