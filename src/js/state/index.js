import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { tokenReducer } from 'state/token'
import { sectionReducer } from 'state/section'
import { meetingReducer } from 'state/meeting'
import { voteReducer } from 'state/vote'
import { userReducer } from 'state/user'

export { setToken, deleteToken } from 'state/token'
export { setSection } from 'state/section'
export { setMeetings, setCurrentMeeting, getMeetings, createMeeting } from 'state/meeting'
export { getVotes, getVote, createVote, updateVote } from 'state/vote'
export { getUsers, deleteUser, addUser } from 'state/user'

const logger = createLogger({
  duration: true,
  collapsed: true,
})

export const store = createStore(
  combineReducers({
    token: tokenReducer,
    section: sectionReducer,
    meeting: meetingReducer,
    vote: voteReducer,
    user: userReducer,
  }),
  applyMiddleware(thunk, logger)
)
