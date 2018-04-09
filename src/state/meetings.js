import { Container } from 'unstated'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { get } from 'utils'
import { socketURL } from 'config'
import {
  getMeetings as getMeetingsAPI,
  createMeeting as createMeetingAPI,
  getScanners as getScannersAPI,
  getAttendants as getAttendantsAPI,
  getVotes as getVotesAPI
} from 'api'

let socket

export default class MeetingContainer extends Container {
  state = {
    currentMeeting: undefined,
    currentVote: undefined,
    meetings: [],
    scanners: [],
    attendants: [],
    votes: []
  }

  setCurrentMeeting (meetingID) {
    this.setState({currentMeeting: meetingID})

    this.getAttendants(meetingID)
    this.getScanners(meetingID)
    this.getVotes()
  }

  getScanners (meetingID) {
    getScannersAPI(meetingID).then(scanners => this.setState({scanners}))
  }

  getAttendants (meetingID) {
    getAttendantsAPI(meetingID).then(attendants => this.setState(({attendants})))
  }

  getVotes () {
    getVotesAPI().then(votes => this.setState({votes}))
  }

  getMeetings () {
    getMeetingsAPI().then(meetings => {
      const sortedMeetings = meetings.reverse()
      this.setState({
        meetings: sortedMeetings,
        currentMeeting: sortedMeetings[0]
      })
    })
  }

  createMeeting (name, section) {
    createMeetingAPI(name, section)
      .then(createdMeeting => {
        this.getMeetings()
      })
  }

  updateSocket (meetingID) {
    const token = get('token')

    if (meetingID === undefined || token === undefined) {
      return
    }

    if (socket !== undefined) {
      socket.close()
    }

    socket = new ReconnectingWebSocket(`${socketURL}/meeting/${meetingID}/?token=${token}`)

    socket.onmessage = message => {
      const { type, data } = JSON.parse(message.data)

      if (type === 'attendants_list') {
        this.setState({attendants: data})
      } else if (type === 'scanner_list') {
        this.setState({scanners: data})
      } else {
        console.error('Unkowned socket data: ', type, data)
      }
    }
  }
}
