import { get, set } from 'utils'
import { setLatestMeeting } from 'state'

// action types
const SET_SECTION_ID = 'SET_SECTION_ID'

// action creators
export const setSectionID = section => ({ type: SET_SECTION_ID, payload: section })

// async action creators
export const setSection = section => dispatch => {
  dispatch(setSectionID(section))
  // Set current meeting as the lastest created meeting in that section
  dispatch(setLatestMeeting(section))
}

// reducer
const sectionStoreKey = 'section'
const initialState = get(sectionStoreKey, 1)

export const sectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTION_ID:
      set(sectionStoreKey, action.payload)
      return action.payload
    default:
      return state
  }
}
