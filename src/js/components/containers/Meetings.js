import React from 'react'
import { getMeetings } from 'api'
import

export default class Meetings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      meetings: [],
    }
  }

  componentDidMount() {
    getMeetings()
      .then(meetings => this.setState({ meetings }))
  }

  render() {
    return (
      <ListContainer>
        {this.state.meetings.map(meeting => (
          <a key={meeting.id} className='collection-item' disabled={meeting.archived}>{meeting.name}</a>
        ))}
      </ListContainer>
    )
  }
}
