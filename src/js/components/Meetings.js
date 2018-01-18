import React from 'react'
import { getMeetings } from 'api'
import TextInput from 'components/Materialize/TextInput'

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
      <div className='collection'>
        {this.state.meetings.map(meeting => (
          <a key={meeting.id} className='collection-item' disabled={meeting.archived}>{meeting.name}</a>
        ))
        }
        <TextInput text='Nytt möte' id='newMeeting' />
      </div>
    )
  }
}
