import { getUserInfo as getUserInfoAPI } from 'api'
import { setCurrentSection, setSections } from 'state/sections'

// action types
const SET_USER_INFO = 'SET_USER_INFO'

// action creators
export const setUserInfo = user => ({ type: SET_USER_INFO, payload: user })

export const getUserInfo = () => dispatch => {
  getUserInfoAPI()
    .then(userInfo => {
      dispatch(setUserInfo({
        userName: userInfo.username,
        firstName: userInfo.first_name,
        lastName: userInfo.last_name,
      }))

      dispatch(setSections(userInfo.sections))

      if (userInfo.sections.length > 0) {
        const firstSection = userInfo.sections[0]
        dispatch(setCurrentSection(firstSection))
      }
    })
}

// reducer
const initialState = {
  userName: null,
  firstName: null,
  lastName: null,
}

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userName: action.payload.userName,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      }
    default:
      return state
  }
}
