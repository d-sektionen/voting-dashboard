import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { loginReducer, sectionReducer, meetingReducer } from 'state/reducers'

export { login, logout, setSection, setMeeting } from 'state/actions'

export const store = createStore(
  combineReducers({
    login: loginReducer,
    section: sectionReducer,
    meeting: meetingReducer,
  }),
  applyMiddleware(logger)
)
