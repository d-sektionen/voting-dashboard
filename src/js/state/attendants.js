import { getAttendants as getAttendantsAPI } from 'api'

// action types
const SET_ATTENDANTS = 'SET_ATTENDANTS'

// action creators
export const setAttendants = attendants => ({ type: SET_ATTENDANTS, payload: attendants })

// async action creators
export const getAttendants = meetingID => dispatch => {
  getAttendantsAPI(meetingID)
    .then(attendants => dispatch(setAttendants(attendants)))
}

// reducer
const initialState = []

export const attendantsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ATTENDANTS:
      return action.payload
    default:
      return state
  }
}
