import React from 'react'
import { getMeetings } from 'api'
import ListContainer from 'components/ListContainer'

export default class Meetings extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <ListContainer>
        {/* {this.state.meetings.map(meeting => (
          <a key={meeting.id} className='collection-item' disabled={meeting.archived}>{meeting.name}</a>
        ))} */}
      </ListContainer>
    )
  }
}
