import React from 'react'
import ListContainer from 'components/common/ListContainer'
import ListItem from 'components/common/ListItem'
import TextSubmit from 'components/common/TextSubmit'
import Panel from 'components/common/Panel'
import StateContainer from 'state'
import {connect} from 'utils'

const Meetings = props => {
  const sectionID = props.currentSection.id
  const filteredMeetngs = props.meetings.filter(meeting => meeting.section.id === sectionID)

  return (
    <Panel title='Möten'>
      <TextSubmit text='Nytt möte' onSubmit={meeting => props.createMeeting(meeting)} />
      <ListContainer noItemsText='Inga möten hittades'>
        {
          filteredMeetngs.map(meeting => (
            <ListItem
              active={meeting.id === props.currentMeetingID}
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
}

export default connect(StateContainer)(Meetings)
