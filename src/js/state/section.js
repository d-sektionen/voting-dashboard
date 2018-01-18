import { get, store } from 'utils'

// action types
export const SET_SECTION = 'SET_SECTION'

// action creaters
export const setSection = section => ({ type: SET_SECTION, payload: section })

// reducer
const sectionStoreKey = 'section'
const initialState = get(sectionStoreKey, 1)

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTION:
      store(sectionStoreKey, action.payload)
      return action.payload
    default:
      return state
  }
}
