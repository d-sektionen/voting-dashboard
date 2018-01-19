import { get, store } from 'utils'
import { getMeetings, createMeeting as createMeetingAPI } from 'api'

// action types
export const SET_CURRENT_MEETING = 'SET_CURRENT_MEETING'
export const SET_MEETINGS = 'SET_MEETINGS'

// action creators
export const setCurrentMeeting = meetingID => ({ type: SET_CURRENT_MEETING, payload: meetingID })
export const setMeetings = meetingList => ({ type: SET_MEETINGS, payload: meetingList })

// async action creators
export const fetchMeetings = () => dispatch => {
  getMeetings()
    .then(json => dispatch(setMeetings(json.reverse())))
}

export const createMeeting = (name, section) => dispatch => {
  createMeetingAPI(name, section)
    .then(resp => {
      dispatch(fetchMeetings())
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
    case SET_CURRENT_MEETING:
      store(meetingStoreKey, action.payload)
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

