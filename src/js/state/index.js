import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { tokenReducer } from 'state/token'
import { sectionReducer } from 'state/section'
import { meetingReducer } from 'state/meeting'

export { setToken, deleteToken } from 'state/token'
export { setSection } from 'state/section'
export { setMeetings, setCurrentMeeting, fetchMeetings, createMeeting } from 'state/meeting'

export const store = createStore(
  combineReducers({
    token: tokenReducer,
    section: sectionReducer,
    meeting: meetingReducer,
  }),
  applyMiddleware(logger, thunk)
)
