import { getUserInfo as getUserInfoAPI } from 'api'

// action types
const SET_USER = 'SET_USER'
const SET_SECTIONS = 'SET_SECTIONS'
const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION'

// action creators
export const setUser = user => ({ type: SET_USER, payload: user })
export const setSections = sections => ({ type: SET_SECTIONS, payload: sections })
export const setCurrentSection = section => ({ type: SET_CURRENT_SECTION, payload: section })

export const getUserInfo = () => dispatch => {
  getUserInfoAPI()
    .then(json => {
      dispatch(setUser({
        userName: json.username,
        firstName: json.first_name,
        lastName: json.last_name,
      }))
      dispatch(setSections(json.sections))

      if (json.sections.length > 0) {
        dispatch(setSection(json.sections[0]))
      }
    })
}

export const setSection = section => dispatch => {
  dispatch(setCurrentSection(section))
  // Set current meeting as the lastest created meeting in that section
  // dispatch(setCurrentMeeting(getLatestMeeting(section)))
}

// reducer
const initialState = {
  userName: null,
  firstName: null,
  lastName: null,
  sections: [],
  currentSection: {
    id: null,
    name: null,
  },
}

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        userName: action.payload.userName,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    case SET_SECTIONS:
      return {
        ...state,
        sections: action.payload,
      }
    case SET_CURRENT_SECTION:
      return {
        ...state,
        currentSection: action.payload,
      }
    default:
      return state
  }
}
