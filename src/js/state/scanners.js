// import {
//   deleteUser as deleteUserAPI,
//   addUser as addUserAPI,
//   getUsers as getUsersAPI,
// } from 'api'

// // sort by LiU-ID
// const sort = arr => arr.sort((a, b) => a.user.username.localeCompare(b.user.username))

// // action types
// const SET_SCANNERS = 'SET_SCANNERS'

// // action creators
// export const setScanners = scanner => ({ type: SET_SCANNERS, payload: scanner })

// // async action creators
// export const getScanners = meeting => dispatch => {
//   getUsersAPI(meeting)
//     .then(json => dispatch(setScanners(sort(json))))
// }

// export const addUser = (liuID, meeting) => dispatch => {
//   addUserAPI(liuID, meeting)
//     .then(resp => {
//       dispatch(setScanners(meeting))
//     })
// }

// export const deleteUser = (liuID, meeting) => dispatch => {
//   deleteUserAPI(liuID, meeting)
//     .then(resp => {
//       dispatch(getUsers(meeting))
//     })
// }

// // reducer
// const initialState = []

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USERS:
//       return action.payload
//     default:
//       return state
//   }
// }

