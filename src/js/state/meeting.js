import { get, set } from 'utils'
import {
  getMeetings as getMeetingsAPI,
  createMeeting as createMeetingAPI,
} from 'api'
import { setLatestVote, store } from 'state'

// action types
const SET_MEETING_ID = 'SET_MEETING_ID'
const SET_MEETINGS = 'SET_MEETINGS'

// action creators
export const setMeetingID = meetingID => ({ type: SET_MEETING_ID, payload: meetingID })
export const setMeetings = meetingList => ({ type: SET_MEETINGS, payload: meetingList })

// async action creators
export const setCurrentMeeting = meetingID => dispatch => {
  dispatch(setMeetingID(meetingID))
  dispatch(setLatestVote(meetingID))
}

export const setLatestMeeting = section => dispatch => {
  const state = store.getState()
  const lastestMeeting = state.meeting.list.filter(meeting => meeting.section === section)[0]

  // A section might not have a meeting yet, if thats the case set meeting id to null
  const meetingID = lastestMeeting ? lastestMeeting.id : null
  dispatch(setCurrentMeeting(meetingID))
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
  currentMeeting: get(meetingStoreKey, null),
  list: [],
}

export const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING_ID:
      set(meetingStoreKey, action.payload)
      return {
        ...state,
        currentMeeting: action.payload,
      }
    case SET_MEETINGS:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
