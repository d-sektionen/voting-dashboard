import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { tokenReducer } from 'state/token'
import { sectionReducer } from 'state/section'
import { meetingReducer } from 'state/meeting'

export { setToken, deleteToken } from 'state/token'
export { setSection } from 'state/section'
export { setMeetings, setMeetingID } from 'state/meeting'

export const store = createStore(
  combineReducers({
    login: tokenReducer,
    section: sectionReducer,
    meeting: meetingReducer,
  }),
  applyMiddleware(logger)
)
