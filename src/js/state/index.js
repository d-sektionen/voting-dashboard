import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import { tokenReducer } from 'state/token'
import { sectionReducer } from 'state/section'
import { meetingReducer } from 'state/meeting'
import { userReducer } from 'state/user'

export { setToken, deleteToken } from 'state/token'
export { setSection } from 'state/section'
export { setMeetings, setCurrentMeeting, fetchMeetings, createMeeting } from 'state/meeting'
export { getUsers, deleteUser, addUser } from 'state/user'

export const store = createStore(
  combineReducers({
    token: tokenReducer,
    section: sectionReducer,
    meeting: meetingReducer,
    user: userReducer,
  }),
  applyMiddleware(logger, thunk)
)
