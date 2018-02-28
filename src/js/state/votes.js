import {
  getVotes as getVotesAPI,
  getVote as getVoteAPI,
  createVote as createVoteAPI,
  updateVote as updateVoteAPI,
} from 'api'

// action types
const SET_VOTE = 'SET_VOTE'
const SET_VOTES = 'SET_VOTES'

// action creators
const setCurrentVote = vote => ({ type: SET_VOTE, payload: vote })
const setVotes = votes => ({ type: SET_VOTES, payload: votes })

// async action creators
export const getVotes = () => dispatch => {
  getVotesAPI()
    .then(json => dispatch(setVotes(json.reverse())))
}

export const getVote = voteID => dispatch => {
  getVoteAPI(voteID)
    .then(vote => dispatch(setCurrentVote(vote)))
}

export const createVote = (meetingID, question, open, alternatives) => dispatch => {
  createVoteAPI(meetingID, question, open, alternatives)
    .then(createdVote => {
      dispatch(getVotes())
      dispatch(setCurrentVote(createdVote))
    })
}

export const updateVote = (voteID, question, open, alternatives) => dispatch => {
  updateVoteAPI(voteID, question, open, alternatives)
    .then(updatedVote => dispatch(setCurrentVote(updatedVote)))
}

// reducer
const initialState = {
  current: null,
  all: [],
}

export const votesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VOTE:
      return {
        ...state,
        current: action.payload,
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
