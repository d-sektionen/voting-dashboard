import {
  deleteUser as deleteUserAPI,
  addUser as addUserAPI,
  getUsers as getUsersAPI,
} from 'api'

// sort by LiU-ID
const sort = arr => arr.sort((a, b) => a.id.localeCompare(b.id))

// action types
export const SET_USERS = 'SET_USERS'

// action creators
export const setUsers = users => ({ type: SET_USERS, payload: users })

// async action creators
export const getUsers = () => dispatch => {
  getUsersAPI()
    .then(json => dispatch(setUsers(sort(json))))
}

export const addUser = (liuID, meeting) => dispatch => {
  addUserAPI(liuID, meeting)
    .then(resp => {
      dispatch(getUsers())
    })
}

export const deleteUser = (liuID, meeting) => dispatch => {
  deleteUserAPI(liuID, meeting)
    .then(resp => {
      dispatch(getUsers())
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

