import { hasToken } from 'api'
import { LOGGED_IN, LOGGED_OUT, SET_SECTION, SET_MEETING } from 'state/actions'

export const loginReducer = (state = hasToken(), action) => {
  switch (action.type) {
    case LOGGED_IN:
      return true
    case LOGGED_OUT:
      return false
    default:
      return state
  }
}

export const sectionReducer = (state = 'd', action) => {
  switch (action.type) {
    case SET_SECTION:
      return action.payload
    default:
      return state
  }
}

export const meetingReducer = (state = null, action) => {
  switch (action.type) {
    case SET_MEETING:
      return action.payload
    default:
      return state
  }
}
