import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { tokenReducer } from 'state/token'
import { meetingsReducer } from 'state/meetings'
import { votesReducer } from 'state/votes'
import { attendantsReducer } from 'state/attendants'
import { scannersReducer } from 'state/scanners'
import { userInfoReducer } from 'state/userInfo'
import { sectionsReducer } from 'state/sections'

export * from 'state/token'
export * from 'state/meetings'
export * from 'state/votes'
export * from 'state/attendants'
export * from 'state/scanners'
export * from 'state/userInfo'
export * from 'state/sections'

const logger = createLogger({
  duration: true,
  collapsed: true,
})

export const store = createStore(
  combineReducers({
    token: tokenReducer,
    meetings: meetingsReducer,
    votes: votesReducer,
    attendants: attendantsReducer,
    scanners: scannersReducer,
    userInfo: userInfoReducer,
    sections: sectionsReducer,
  }),
  applyMiddleware(thunk, logger)
)
