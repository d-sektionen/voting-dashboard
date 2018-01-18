import { get, store } from 'utils'
import { getMeetings } from 'api'

// action types
export const SET_MEETING_ID = 'SET_MEETING_ID'
export const SET_MEETINGS = 'SET_MEETINGS'

// action creators
export const setMeetingID = meetingID => ({ type: SET_MEETING_ID, payload: meetingID })
export const setMeetings = meetingList => ({ type: SET_MEETINGS, payload: meetingList })

// async action creators
export const fetchMeetings = () => dispatch => {
  getMeetings()
    .then(json => dispatch(setMeetings(json)))
}

// reducer
const meetingStoreKey = 'meeting'
const initialState = {
  id: get(meetingStoreKey, null),
  list: [],
}

export const meetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEETING_ID:
      store(meetingStoreKey, action.payload)
      return {
        ...state,
        id: action.payload,
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

