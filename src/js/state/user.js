import {
  deleteUser as deleteUserAPI,
  addUser as addUserAPI,
  getUsers as getUsersAPI,
} from 'api'

// sort by LiU-ID
const sort = arr => arr.sort((a, b) => a.user.username.localeCompare(b.user.username))

// action types
const SET_USERS = 'SET_USERS'

// action creators
export const setUsers = users => ({ type: SET_USERS, payload: users })

// async action creators
export const getUsers = meeting => dispatch => {
  getUsersAPI(meeting)
    .then(json => dispatch(setUsers(sort(json))))
}

export const addUser = (liuID, meeting) => dispatch => {
  addUserAPI(liuID, meeting)
    .then(resp => {
      dispatch(getUsers(meeting))
    })
}

export const deleteUser = (liuID, meeting) => dispatch => {
  deleteUserAPI(liuID, meeting)
    .then(resp => {
      dispatch(getUsers(meeting))
    })
}

// reducer
const initialState = []

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload
    default:
      return state
  }
}

