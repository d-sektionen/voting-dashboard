import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const attendantURL = '/voting/attendants/'

export const getAttendants = meetingID => fetchAPI(`${attendantURL}?meeting=${meetingID}`)

export const addAttendant = (liuID, meetingID) => postAPI(attendantURL, { username: liuID, meeting: meetingID })

export const removeAttendant = (attendantID, meetingID) => deleteAPI(`${attendantURL}${attendantID}/?meeting=${meetingID}`)
