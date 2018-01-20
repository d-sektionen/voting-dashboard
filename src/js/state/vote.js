import { get, store } from 'utils'
import {
  getVotes as getVotesAPI,
  getVote as getVoteAPI,
  createVote as createVoteAPI,
  updateVote as updateVoteAPI,
} from 'api'

// action types
export const SET_CURRENT_VOTE_ID = 'SET_CURRENT_VOTE_ID'
export const SET_CURRENT_VOTE = 'SET_CURRENT_VOTE'
export const SET_VOTES = 'SET_VOTES'

// action creators
export const setCurrentVoteID = voteID => ({ type: SET_CURRENT_VOTE_ID, payload: voteID })
export const setCurrentVote = vote => ({ type: SET_CURRENT_VOTE, payload: vote })
export const setVotes = voteList => ({ type: SET_VOTES, payload: voteList })

// async action creators
export const getVotes = () => dispatch => {
  getVotesAPI()
    .then(json => dispatch(setVotes(json.reverse())))
}

export const getVote = voteID => dispatch => {
  getVoteAPI(voteID)
    .then(json => dispatch(setCurrentVote(json)))
}

export const createVote = (question, meetingID) => dispatch => {
  createVoteAPI(question, meetingID)
    .then(resp => dispatch(getVotes()))
}

export const updateVote = (voteID, question, open, alternatives) => dispatch => {
  updateVoteAPI(voteID, question, open, alternatives)
    .then(resp => dispatch(getVote(voteID)))
}

// reducer
const voteStoreKey = 'vote'
const initialState = {
  currentVoteID: get(voteStoreKey, null),
  currentVote: {},
  list: [],
}

export const voteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_VOTE_ID:
      store(voteStoreKey, action.payload)
      return {
        ...state,
        currentVoteID: action.payload,
      }
    case SET_CURRENT_VOTE:
      return {
        ...state,
        currentVote: action.payload,
      }
    case SET_VOTES:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

