import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { tokenReducer } from 'state/token'
import { sectionReducer } from 'state/section'
import { meetingReducer } from 'state/meeting'
import { voteReducer } from 'state/vote'
import { userReducer } from 'state/user'
import { usernameReducer } from 'state/username'

export * from 'state/token'
export * from 'state/section'
export * from 'state/meeting'
export * from 'state/vote'
export * from 'state/user'
export * from 'state/username'

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
    username: usernameReducer,
  }),
  applyMiddleware(thunk, logger)
)
