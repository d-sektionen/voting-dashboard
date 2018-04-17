import React from 'react'
import ListContainer from 'components/common/ListContainer'
import ListItem from 'components/common/ListItem'
import TextSubmit from 'components/common/TextSubmit'
import Panel from 'components/common/Panel'
import {connect} from 'utils'

const Meetings = props => {
  const filteredMeetngs = props.meetings.filter(meeting => meeting.section.id === props.currentSectionID)

  return (
    <Panel title='Möten'>
      <TextSubmit text='Nytt möte' onSubmit={meeting => props.createMeeting(meeting)} />
      <ListContainer noItemsText='Inga möten skapade än'>
        {
          filteredMeetngs.map(meeting => (
            <ListItem
              className='pointer'
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

export default connect(Meetings)
