import {
  getVotes as getVotesAPI,
  getVote as getVoteAPI,
  createVote as createVoteAPI,
  updateVote as updateVoteAPI,
  removeVote as removeVoteAPI,
} from 'api'

export const defaultVote = Object.freeze({
  question: '',
  alternatives: [
    { text: '' },
    { text: '' },
  ],
  open: true,
  id: null,
  meeting: null,
})

// action types
const SET_EDITED_VOTE_QUESTION = 'SET_EDITED_VOTE_QUESTION'
const SET_EDITED_VOTE_ALTERNATIVES = 'SET_EDITED_VOTE_ALTERNATIVES'
const SET_EDITED_VOTE_OPEN = 'SET_EDITED_VOTE_OPEN'
const SET_EDITED_VOTE_ID = 'SET_EDITED_VOTE_ID'
const SET_EDITED_VOTE_MEETING_ID = 'SET_EDITED_VOTE_MEETING_ID'
const SET_EDITED_VOTE = 'SET_EDITED_VOTE'
const SET_SELECTED_VOTE = 'SET_SELECTED_VOTE'

const SET_VOTES = 'SET_VOTES'

// For the vote currently being edited / created
export const setEditedVoteQuestion = question => ({ type: SET_EDITED_VOTE_QUESTION, payload: question })
export const setEditedVoteAlternatives = alternatives => ({ type: SET_EDITED_VOTE_ALTERNATIVES, payload: alternatives })
export const setEditVoteOpen = open => ({ type: SET_EDITED_VOTE_OPEN, payload: open })
export const setEditedVoteID = voteID => ({ type: SET_EDITED_VOTE_ID, payload: voteID })
export const setEditedVoteMeetingID = meetingID => ({ type: SET_EDITED_VOTE_MEETING_ID, payload: meetingID })
export const setEditedVote = vote => ({ type: SET_EDITED_VOTE, payload: vote })

// The vote that we display the results for
export const setSelectedVote = vote => ({ type: SET_SELECTED_VOTE, payload: vote })

// All votes that exists
const setVotes = votes => ({ type: SET_VOTES, payload: votes })

// async action creators
export const getVotes = () => dispatch => {
  getVotesAPI()
    // Reverse the array of votes to display the newest at the top
    .then(votes => dispatch(setVotes(votes.reverse())))
}

export const getVote = voteID => dispatch => {
  getVoteAPI(voteID)
    .then(vote => dispatch(setSelectedVote(vote)))
}

export const createVote = (meetingID, question, open, alternatives) => dispatch => {
  createVoteAPI(meetingID, question, open, alternatives)
    .then(createdVote => {
      dispatch(getVotes())
      dispatch(setSelectedVote(createdVote))
      dispatch(setEditedVote(defaultVote))
    })
}

export const updateVote = (voteID, question, open, alternatives) => dispatch => {
  updateVoteAPI(voteID, question, open, alternatives)
    .then(updatedVote => {
      dispatch(getVotes())
      // dispatch(setSelectedVote(updatedVote))
      dispatch(setEditedVote(defaultVote))
    })
}

export const removeVote = voteID => dispatch => {
  removeVoteAPI(voteID)
}

// reducer
const initialState = {
  selectedVote: defaultVote,
  editedVote: defaultVote,
  all: [],
}

export const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_EDITED_VOTE_QUESTION:
      return {
        ...state,
        editedVote: {
          ...state.editedVote,
          question: action.payload,
        },
      }
    case SET_EDITED_VOTE_ALTERNATIVES:
      return {
        ...state,
        editedVote: {
          ...state.editedVote,
          alternatives: action.payload,
        },
      }
    case SET_EDITED_VOTE_OPEN:
      return {
        ...state,
        editedVote: {
          ...state.editedVote,
          open: action.payload,
        },
      }
    case SET_EDITED_VOTE_ID:
      return {
        ...state,
        editedVote: {
          ...state.editedVote,
          id: action.payload,
        },
      }
    case SET_EDITED_VOTE_MEETING_ID:
      return {
        ...state,
        editedVote: {
          ...state.editedVote,
          meeting: action.payload,
        },
      }
    case SET_EDITED_VOTE:
      return {
        ...state,
        editedVote: action.payload,
      }
    case SET_SELECTED_VOTE:
      return {
        ...state,
        selectedVote: action.payload,
      }
    case SET_VOTES:
      return {
        ...state,
        all: action.payload,
      }
    default:
      return state
  }
}
