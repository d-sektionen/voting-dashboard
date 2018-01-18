import { get, store, remove } from 'utils'
import { LOG_IN, LOG_OUT, SET_SECTION, SET_MEETING } from 'state/actions'

const tokenStoreKey = 'token'
const sectionStoreKey = 'section'
const meetingStoreKey = 'meeting'

export const loginReducer = (state = get(tokenStoreKey, null), action) => {
  switch (action.type) {
    case LOG_IN:
      store(tokenStoreKey, action.payload)
      return action.payload
    case LOG_OUT:
      remove(tokenStoreKey)
      return null
    default:
      return state
  }
}

export const sectionReducer = (state = get(sectionStoreKey, 'd'), action) => {
  switch (action.type) {
    case SET_SECTION:
      store(sectionStoreKey, action.payload)
      return action.payload
    default:
      return state
  }
}

export const meetingReducer = (state = get(meetingStoreKey, null), action) => {
  switch (action.type) {
    case SET_MEETING:
      store(meetingStoreKey, action.payload)
      return action.payload
    default:
      return state
  }
}
