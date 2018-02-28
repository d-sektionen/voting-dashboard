import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const attendantURL = '/voting/attendants/'

export const getAttendants = meeting => fetchAPI(`${attendantURL}?meeting=${meeting}`)

export const addAttendant = (liuID, meeting) => postAPI(attendantURL, { username: liuID, meeting })

export const removeAttendant = attendantID => deleteAPI(`${attendantURL}${attendantID}/`)
