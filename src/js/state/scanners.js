import { getScanners as getScannersAPI } from 'api'

// action types
const SET_SCANNERS = 'SET_SCANNERS'

// action creators
export const setScanners = scanners => ({ type: SET_SCANNERS, payload: scanners })

// async action creators
export const getScanners = meetingID => dispatch => {
  getScannersAPI(meetingID)
    .then(scanners => dispatch(setScanners(scanners)))
}

// reducer
const initialState = []

export const scannersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCANNERS:
      return action.payload
    default:
      return state
  }
}
