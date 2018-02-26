import { getUsers as getUsersAPI } from 'api'

// action types
const SET_USERS = 'SET_USERS'
const ADD_USER = 'ADD_USER'

// action creators
export const setUsers = users => ({ type: SET_USERS, payload: users })
export const addUser = user => ({ type: ADD_USER, payload: user })

// async action creators
export const getUsers = meeting => dispatch => {
  getUsersAPI(meeting)
    .then(json => dispatch(setUsers(json)))
}

// reducer
const initialState = []

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.payload
    case ADD_USER:
      return [...state, action.payload]
    default:
      return state
  }
}
