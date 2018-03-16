import React from 'react'
import { connect } from 'react-redux'
import { getMeetings, createMeeting, setCurrentMeeting } from 'state'
import ListContainer from 'components/ListContainer'
import ListItem from 'components/ListItem'
import TextSubmit from 'components/TextSubmit'
import Panel from 'components/Panel'

class Meetings extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.token && this.props.currentSection.id) {
      this.props.getMeetings()
    }
  }

  componentWillReceiveProps(nextProps) {
    // Selected a section
    if (nextProps.token && !this.props.currentSection.id && nextProps.currentSection.id) {
      this.props.getMeetings()
    }
  }

  handleSubmit(meetingName) {
    const section = this.props.currentSection

    if (section.id) {
      this.props.createMeeting(meetingName, section)
    }
  }

  render() {
    const filteredMeetngs = this.props.meetings.filter(meeting => meeting.section.id === this.props.currentSection.id)

    return (
      <Panel title='Möten'>
        <TextSubmit text='Nytt möte' onSubmit={this.handleSubmit} />
        <ListContainer noItemsText='Inga möten hittades'>
          {
          filteredMeetngs.map(meeting => (
            <ListItem
              active={meeting.id === this.props.currentMeetingID}
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
  token: state.token,
  currentMeetingID: state.meetings.current,
  meetings: state.meetings.all,
  currentSection: state.sections.current,
})

const mapDispatchToProps = dispatch => ({
  createMeeting: (meetingName, section) => dispatch(createMeeting(meetingName, section)),
  setCurrentMeeting: meetingID => dispatch(setCurrentMeeting(meetingID)),
  getMeetings: () => dispatch(getMeetings()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Meetings)
