import { get, set } from 'utils'
import {
  getMeetings as getMeetingsAPI,
  createMeeting as createMeetingAPI,
} from 'api'
import { getLatestVote, setCurrentVote, store } from 'state'

// action types
const SET_MEETING_ID = 'SET_MEETING_ID'
const SET_MEETINGS = 'SET_MEETINGS'

// action creators
const setMeetingID = meetingID => ({ type: SET_MEETING_ID, payload: meetingID })
const setMeetings = meetingList => ({ type: SET_MEETINGS, payload: meetingList })

// async action creators
export const setCurrentMeeting = meetingID => dispatch => {
  dispatch(setMeetingID(meetingID))
  dispatch(setCurrentVote(getLatestVote(meetingID)))
}

export const getMeetings = () => dispatch => {
  getMeetingsAPI()
    .then(json => dispatch(setMeetings(json.reverse())))
}

export const createMeeting = (name, section) => dispatch => {
  createMeetingAPI(name, section)
    .then(resp => {
      dispatch(getMeetings())
    })
}

// reducer
const meetingStoreKey = 'meeting'
const initialState = {
  current: get(meetingStoreKey, null),
  all: [],
}

export const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING_ID:
      set(meetingStoreKey, action.payload)
      return {
        ...state,
        current: action.payload,
      }
    case SET_MEETINGS:
      return {
        ...state,
        all: action.payload,
      }
    default:
      return state
  }
}

// helper functinos
export const getLatestMeeting = section => {
  const state = store.getState()
  const lastestMeeting = state.meeting.all.filter(meeting => meeting.section === section)[0]

  // A section might not have a meeting yet, if thats the case set meeting id to null
  return lastestMeeting ? lastestMeeting.id : null
}
