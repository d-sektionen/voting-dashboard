import { getScanners as getScannersAPI } from 'api'

// action types
const SET_SCANNERS = 'SET_SCANNERS'
const ADD_SCANNER = 'ADD_SCANNER'

// action creators
export const setScanners = scanners => ({ type: SET_SCANNERS, payload: scanners })
export const addScanner = scanner => ({ type: ADD_SCANNER, payload: scanner })

// async action creators
export const getScanners = () => dispatch => {
  getScannersAPI()
    .then(scanners => dispatch(setScanners(scanners)))
}

// reducer
const initialState = []

export const scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCANNERS:
      return action.payload
    case ADD_SCANNER:
      return [...state, action.payload]
    default:
      return state
  }
}
