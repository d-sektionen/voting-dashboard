import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { tokenReducer } from 'state/token'
import { meetingReducer } from 'state/meeting'
import { voteReducer } from 'state/vote'
import { userReducer } from 'state/user'
import { userInfoReducer } from 'state/userInfo'

export * from 'state/token'
export * from 'state/meeting'
export * from 'state/vote'
export * from 'state/user'
export * from 'state/userInfo'

const logger = createLogger({
  duration: true,
  collapsed: true,
})

export const store = createStore(
  combineReducers({
    token: tokenReducer,
    meeting: meetingReducer,
    vote: voteReducer,
    user: userReducer,
    userInfo: userInfoReducer,
  }),
  applyMiddleware(thunk, logger)
)
