import { Container } from 'unstated'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { getToken as getStoredToken, liuIDSort, idSort } from './common'
import { socketURL } from './config'
import {
  getMeetings as getMeetingsAPI, createMeeting as createMeetingAPI,
  getAttendants as getAttendantsAPI, addAttendant as addAttendantAPI, removeAttendant as removeAttendantAPI,
  getScanners as getScannersAPI, addScanner as addScannerAPI, removeScanner as removeScannerAPI,
  getVotes as getVotesAPI,
  getVote as getVoteAPI, createVote as createVoteAPI, updateVote as updateVoteAPI,
  getUserInfo as getUserInfoAPI
} from './api'

let socket

// TODO: split into multiple containers
export default class StateContainer extends Container {
  state = {
    currentMeetingID: undefined,
    currentVote: defaultCurrentVote,
    meetings: [],
    scanners: [],
    attendants: [],
    votes: [],
    token: undefined,
    editedVote: defaultEditedVote,
    sections: [],
    currentSectionID: undefined,
    userName: undefined,
    firstName: undefined,
    lastName: undefined,
    modalOpen: false,
    modalEditMode: false
  }

  getToken = () => this.setState({ token: getStoredToken() })

  getUserInfo = () => {
    getUserInfoAPI().then(({ userName, firstName, lastName, sections }) => {
      this.setState({ userName, firstName, lastName, sections })
      if (sections.length > 0) {
        this.setCurrentSection(sections[0].id)
      }
    })
  }

  // -------------------- SECTIONS --------------------
  setCurrentSection = currentSectionID => {
    this.setState({ currentSectionID })
    this.getMeetings()
  }

  // -------------------- MEETINGS --------------------
  setCurrentMeeting = (meetingID) => {
    this.setState({ currentMeetingID: meetingID })
    this.getAttendants(meetingID)
    this.getScanners(meetingID)
    this.getVotes()
    this.updateSocket(meetingID)
  }

  getMeetings = () => {
    getMeetingsAPI().then(meetings => {
      const sortedMeetings = meetings.reverse()

      this.setState({ meetings: sortedMeetings })

      if (sortedMeetings.length > 0) {
        this.setCurrentMeeting(sortedMeetings[0].id)
      }
    })
  }

  createMeeting = name => createMeetingAPI(name, this.state.currentSectionID).then(createdMeeting => this.getMeetings())

  // -------------------- ATTENDANTS --------------------
  getAttendants = meetingID => {
    this.setState({ attendants: [] })
    getAttendantsAPI(meetingID).then(attendants => {
      attendants.sort(liuIDSort)
      this.setState({ attendants })
    })
  }

  addAttendant = liuID => addAttendantAPI(liuID, this.state.currentMeetingID)
  removeAttendant = attendantID => removeAttendantAPI(attendantID, this.state.currentMeetingID)
  removeAllAttendants = () => this.state.attendants.forEach(attendant => this.removeAttendant(attendant.id))

  // -------------------- SCANNERS --------------------
  getScanners = meetingID => {
    this.setState({ scanners: [] })
    getScannersAPI(meetingID).then(scanners => {
      scanners.sort(liuIDSort)
      this.setState({ scanners })
    })
  }

  addScanner = liuID => addScannerAPI(liuID, this.state.currentMeetingID)
  removeScanner = scannerID => removeScannerAPI(scannerID, this.state.currentMeetingID)

  // -------------------- DISPLAYING VOTES --------------------
  getVotes = () => getVotesAPI().then(votes => {
    votes.sort(idSort)
    this.setState({ votes })
  })

  // -------------------- MODAL --------------------
  setEditedVote = editedVote => this.setState({ editedVote })
  editVote = (vote = defaultEditedVote) => {
    this.setState({
      modalOpen: true,
      modalEditMode: true,
      editedVote: vote
    })
  }

  closeModal = () => this.setState({ modalOpen: false })

  showResults = voteID => {
    this.setState({
      modalEditMode: false,
      modalOpen: true,
      currentVote: defaultEditedVote
    })

    getVoteAPI(voteID).then(currentVote => this.setState({ currentVote }))
  }

  createVote = () => {
    this.setState({ modalOpen: false })
    const { question, open, alternatives } = this.state.editedVote

    createVoteAPI(this.state.currentMeetingID, question, open, alternatives)
      .then(createdVote => {
        this.getVotes()
      })
  }

  updateVote = () => {
    this.setState({ modalOpen: false })
    const { id, question, open, alternatives } = this.state.editedVote

    updateVoteAPI(id, question, open, alternatives)
      .then(updatedVote => {
        this.getVotes()
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
        this.setState({ attendants: data })
      } else if (type === 'scanner_list') {
        data.sort(liuIDSort)
        this.setState({ scanners: data })
      } else if (type === 'vote_details') {
        this.setState({ currentVote: data })
      }
    }
  }
}

const defaultEditedVote = Object.freeze({
  question: '',
  alternatives: [
    { text: '' },
    { text: '' }
  ],
  open: true,
  id: null,
  meeting: null
})

const defaultCurrentVote = Object.freeze({
  id: undefined,
  alternatives: []
})
