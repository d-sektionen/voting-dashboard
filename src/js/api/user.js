import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const userURL = '/voting/attendants/'

export const getUsers = meeting => fetchAPI(`${userURL}?meeting=${meeting}`)

export const addUser = (liuID, meeting) => postAPI(userURL, { username: liuID, meeting })

export const removeUser = attendantsID => deleteAPI(`${userURL}${attendantsID}/`)

