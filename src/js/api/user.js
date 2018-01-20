import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const userURL = '/voting/attendants/'

export const getUsers = () => fetchAPI(userURL)

export const addUser = (liuID, meeting) => postAPI(userURL, { username: liuID, meeting })

export const removeUser = liuID => deleteAPI(`${userURL}${liuID}/`)

