import React from 'react'
import TextSubmit from 'components/common/TextSubmit'
import ListContainer from 'components/common/ListContainer'
import {connect} from 'utils'

const Meetings = props => {
  const filteredMeetngs = props.meetings.filter(meeting => meeting.section.id === props.currentSectionID)

  return (
    <div className='panel' id='meetings'>
      <h4 title='Alla möten som du är admin för'>Möten</h4>
      <hr />
      <TextSubmit placeholder='Nytt möte' onSubmit={meeting => props.createMeeting(meeting)} />
      <hr />
      <ListContainer noItemsText='Inga möten skapade än'>
        {
          filteredMeetngs.map(meeting => (
            <button
              onClick={() => props.setCurrentMeeting(meeting.id)}
              className={meeting.id === props.currentMeetingID ? 'button-primary' : ''}
              title={meeting.name}
              key={`meeting${meeting.id}`}
            >
              {meeting.name}
            </button>
          ))
        }
      </ListContainer>
    </div>
  )
}

export default connect(Meetings)
