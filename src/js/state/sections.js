// action types
const SET_CURRENT_SECTION = 'SET_CURRENT_SECTION'
const SET_SECTIONS = 'SET_SECTIONS'

// action creators
export const setCurrentSection = section => ({ type: SET_CURRENT_SECTION, payload: section })
export const setSections = sections => ({ type: SET_SECTIONS, payload: sections })

// reducer
const initialState = {
  current: {
    id: null,
    name: null,
  },
  all: [],
}

export const sectionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_SECTION:
      return {
        ...state,
        current: action.payload,
      }
    case SET_SECTIONS:
      return {
        ...state,
        all: action.payload,
      }
    default:
      return state
  }
}
