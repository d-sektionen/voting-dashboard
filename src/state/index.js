import { Container } from 'unstated'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { get, set } from 'utils'
import { socketURL } from 'config'
import {
  getMeetings as getMeetingsAPI,
  createMeeting as createMeetingAPI,
  getScanners as getScannersAPI,
  getAttendants as getAttendantsAPI,
  getVotes as getVotesAPI,
  getVote as getVoteAPI,
  getUserInfo as getUserInfoAPI,
  createdVote as createVoteAPI,
  updatedVote as updateVoteAPI
} from 'api'
import queryString from 'query-string'

let socket

// TODO: split into multiple containers
export default class StateContainer extends Container {
  state = {
    currentMeeting: undefined,
    currentVote: undefined,
    meetings: [],
    scanners: [],
    attendants: [],
    votes: [],
    token: undefined,
    editedVote: defaultVote,
    sections: [],
    currentSection: undefined,
    userName: undefined,
    firstName: undefined,
    lastName: undefined
  }

  getToken () {
    let { token } = queryString.parse(window.location.search)

    if (token !== undefined) {
      window.history.replaceState(null, null, window.location.pathname)
    } else {
      token = get('token')
    }

    set('token', token)
    this.setState({token})
  }

  getUserInfo () {
    getUserInfoAPI()
      .then(userInfo => {
        this.setState({
          userName: userInfo.username,
          firstName: userInfo.first_name,
          lastName: userInfo.last_name,
          sections: userInfo.sections,
          currentSection: userInfo.sections[0]
        })
      })
  }

  setCurrentSection (sectionObject) {
    this.setState({current: sectionObject})
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

  getVote (voteID) {
    getVoteAPI(voteID)
      .then(currentVote => this.setState({currentVote}))
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

  setEditedVote (editedVote) {
    this.setState({editedVote})
  }

  createVote (meetingID, question, open, alternatives) {
    createVoteAPI(meetingID, question, open, alternatives)
      .then(createdVote => {
        // dispatch(getVotes())
        // dispatch(setSelectedVote(createdVote))
        // dispatch(getVote(createdVote.id))
        // dispatch(setEditedVote(defaultVote))
      })
  }

  updateVote (voteID, question, open, alternatives) {
    updateVoteAPI(voteID, question, open, alternatives)
      .then(updatedVote => {
      // dispatch(getVotes())
      // dispatch(setSelectedVote(updatedVote))
      // dispatch(setEditedVote(defaultVote))
      })
  }

  updateSocket (meetingID) {
    const token = get('token')

    if (meetingID === undefined || token === undefined) {
      return
    }

    // Clean up old socket
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

const defaultVote = Object.freeze({
  question: '',
  alternatives: [
    { text: '' },
    { text: '' }
  ],
  open: true,
  id: null,
  meeting: null
})
