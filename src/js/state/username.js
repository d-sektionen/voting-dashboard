import { getUsername as getUsernameAPI } from 'api'

// action types
const SET_USERNAME = 'SET_USERNAME'

// action creators
export const setUsername = username => ({ type: SET_USERNAME, payload: username })


export const getUsername = () => dispatch => {
  getUsernameAPI()
    .then(json => dispatch(setUsername(json.username)))
}

// reducer
const initialState = ''

export const usernameReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERNAME:
      return action.payload
    default:
      return state
  }
}
