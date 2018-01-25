import {
  getVotes as getVotesAPI,
  getVote as getVoteAPI,
  createVote as createVoteAPI,
  updateVote as updateVoteAPI,
} from 'api'
import { store } from 'state'

// action types
const SET_VOTE = 'SET_VOTE'
const SET_VOTES = 'SET_VOTES'

// action creators
const setVote = vote => ({ type: SET_VOTE, payload: vote })
const setVotes = voteList => ({ type: SET_VOTES, payload: voteList })

// async action creators
export const getVotes = () => dispatch => {
  getVotesAPI()
    .then(json => dispatch(setVotes(json.reverse())))
}

export const setCurrentVote = voteID => dispatch => {
  if (voteID === null) {
    dispatch(setVote({}))
    return
  }

  getVoteAPI(voteID)
    .then(resp => {
      dispatch(setVote(resp))
    })
}

export const createVote = (question, meetingID) => dispatch => {
  createVoteAPI(question, meetingID, [])
    .then(resp => {
      dispatch(getVotes())
      dispatch(setVote(resp))
    })
}

export const updateVote = (voteID, question, open, alternatives) => dispatch => {
  updateVoteAPI(voteID, question, open, alternatives)
    .then(resp => dispatch(setVote(resp)))
}

// reducer
const initialState = {
  current: {},
  all: [],
}

export const voteReducer = (state = initialState, action) => {
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

// helper functions
export const getLatestVote = meetingID => {
  if (meetingID === null) {
    return null
  }

  const state = store.getState()
  const lastestVote = state.vote.all.filter(vote => vote.meeting === meetingID)[0]

  // A meeting might not have a vote yet, if thats the case set current vote empty object
  return lastestVote ? lastestVote.id : null
}
