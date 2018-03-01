import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const attendantURL = '/voting/attendants/'

export const getAttendants = meeting => fetchAPI(`${attendantURL}?meeting=${meeting}`)

export const addAttendant = (liuID, meetingID) => postAPI(attendantURL, { username: liuID, meetingID })

export const removeAttendant = (attendantID, meetingID) => deleteAPI(`${attendantURL}${attendantID}/?meeting=${meetingID}`)
