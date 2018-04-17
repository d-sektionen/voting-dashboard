import { Container } from 'unstated'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { getToken as getStoredToken, liuIDSort } from 'utils'
import { socketURL } from 'config'
import {
  getMeetings as getMeetingsAPI, createMeeting as createMeetingAPI,
  getAttendants as getAttendantsAPI, addAttendant as addAttendantAPI, removeAttendant as removeAttendantAPI,
  getScanners as getScannersAPI, addScanner as addScannerAPI, removeScanner as removeScannerAPI,
  getVotes as getVotesAPI,
  getVote as getVoteAPI, createdVote as createVoteAPI, updatedVote as updateVoteAPI,
  getUserInfo as getUserInfoAPI
} from 'api'

let socket

// TODO: split into multiple containers
export default class StateContainer extends Container {
  state = {
    currentMeetingID: undefined,
    currentVote: {
      id: undefined,
      alternatives: []
    },
    meetings: [],
    scanners: [],
    attendants: [],
    votes: [],
    token: undefined,
    editedVote: defaultVote,
    sections: [],
    currentSectionID: undefined,
    userName: undefined,
    firstName: undefined,
    lastName: undefined
  }

  getToken = () => this.setState({token: getStoredToken()})

  getUserInfo = () => {
    getUserInfoAPI().then(({userName, firstName, lastName, sections}) => {
      this.setState({userName, firstName, lastName, sections})
      if (sections.length > 0) {
        this.setCurrentSection(sections[0].id)
      }
    })
  }

  setCurrentSection = currentSectionID => {
    this.setState({currentSectionID})
    this.getMeetings()
  }

  setCurrentMeeting = (meetingID) => {
    this.setState({currentMeetingID: meetingID})
    this.getAttendants(meetingID)
    this.getScanners(meetingID)
    this.getVotes()
    this.updateSocket(meetingID)
  }

  createMeeting = name => createMeetingAPI(name, this.state.currentSectionID).then(createdMeeting => this.getMeetings())

  getAttendants = meetingID => {
    this.setState({attendants: []})
    getAttendantsAPI(meetingID).then(attendants => {
      attendants.sort(liuIDSort)
      this.setState({attendants})
    })
  }

  addAttendant = liuID => addAttendantAPI(liuID, this.state.currentMeetingID)
  removeAttendant = attendantID => removeAttendantAPI(attendantID, this.state.currentMeetingID)
  removeAllAttendants = () => this.state.attendants.forEach(attendant => this.removeAttendant(attendant.id))

  getScanners = meetingID => {
    this.setState({scanners: []})
    getScannersAPI(meetingID).then(scanners => {
      scanners.sort(liuIDSort)
      this.setState({scanners})
    })
  }
  addScanner = liuID => addScannerAPI(liuID, this.state.currentMeetingID)
  removeScanner = scannerID => removeScannerAPI(scannerID, this.state.currentMeetingID)

  getVotes = () => getVotesAPI().then(votes => this.setState({votes}))
  getVote = voteID => getVoteAPI(voteID).then(currentVote => this.setState({currentVote}))

  getMeetings = () => {
    getMeetingsAPI().then(meetings => {
      const sortedMeetings = meetings.reverse()

      this.setState({meetings: sortedMeetings})

      if (sortedMeetings.length > 0) {
        this.setCurrentMeeting(sortedMeetings[0].id)
      }
    })
  }

  setEditedVote = editedVote => this.setState({editedVote})
  resetEditedVote = () => this.setState({editedVote: defaultVote})

  createVote = (meetingID, question, open, alternatives) => {
    createVoteAPI(meetingID, question, open, alternatives)
      .then(createdVote => {
        // dispatch(getVotes())
        // dispatch(setSelectedVote(createdVote))
        // dispatch(getVote(createdVote.id))
        // dispatch(setEditedVote(defaultVote))
      })
  }

  updateVote = (voteID, question, open, alternatives) => {
    updateVoteAPI(voteID, question, open, alternatives)
      .then(updatedVote => {
      // dispatch(getVotes())
      // dispatch(setSelectedVote(updatedVote))
      // dispatch(setEditedVote(defaultVote))
      })
  }

  updateSocket = (meetingID) => {
    if (meetingID === undefined || this.state.token === undefined) {
      return
    }

    // Clean up old socket
    if (socket !== undefined) {
      socket.close()
    }

    socket = new ReconnectingWebSocket(`${socketURL}/meeting/${meetingID}/?token=${this.state.token}`)

    socket.onmessage = message => {
      const { type, data } = JSON.parse(message.data)

      if (type === 'attendants_list') {
        data.sort(liuIDSort)
        this.setState({attendants: data})
      } else if (type === 'scanner_list') {
        data.sort(liuIDSort)
        this.setState({scanners: data})
      } else if (type === 'vote_details') {
        this.setState({currentVote: data})
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
