import { get, set, remove } from 'utils'

// action types
const SET_TOKEN = 'SET_TOKEN'
const DELETE_TOKEN = 'DELETE_TOKEN'

// action creators
export const setToken = token => ({ type: SET_TOKEN, payload: token })
export const deleteToken = () => ({ type: DELETE_TOKEN })

// reducer
const tokenStoreKey = 'token'
const initialState = get(tokenStoreKey, null)

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      set(tokenStoreKey, action.payload)
      return action.payload
    case DELETE_TOKEN:
      remove(tokenStoreKey)
      window.location = '/dashboard'
      return null
    default:
      return state
  }
}
