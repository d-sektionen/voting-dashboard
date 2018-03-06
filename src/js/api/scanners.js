import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const userURL = '/voting/scanners/'

export const getScanners = meetingID => fetchAPI(`${userURL}?meeting=${meetingID}`)

export const addScanner = (liuID, meetingID) => postAPI(userURL, { username: liuID.toLowerCase(), meeting: meetingID })

export const removeScanner = (scanner, meetingID) => deleteAPI(`${userURL}${scanner}/?meeting=${meetingID}`)
