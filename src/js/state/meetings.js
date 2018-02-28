import {
  getMeetings as getMeetingsAPI,
  createMeeting as createMeetingAPI,
} from 'api'

// action types
const SET_CURRENT_MEETING_ID = 'SET_CURRENT_MEETING_ID'
const SET_MEETINGS = 'SET_MEETINGS'

// action creators
export const setCurrentMeetingID = meetingID => ({ type: SET_CURRENT_MEETING_ID, payload: meetingID })
const setMeetings = meetingList => ({ type: SET_MEETINGS, payload: meetingList })

export const getMeetings = () => dispatch => {
  getMeetingsAPI()
    // Put newest meetings first in array
    .then(json => dispatch(setMeetings(json.reverse())))
}

export const createMeeting = (name, section) => dispatch => {
  createMeetingAPI(name, section)
    .then(createdMeeting => {
      dispatch(getMeetings())
    })
}

// reducer
const initialState = {
  current: null,
  all: [],
}

export const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_MEETING_ID:
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
