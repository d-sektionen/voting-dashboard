import { createStore, combineReducers } from 'redux'
import { loginReducer, sectionReducer, meetingReducer } from 'state/reducers'

createStore(combineReducers({
  login: loginReducer,
  section: sectionReducer,
  meeting: meetingReducer,
}))
