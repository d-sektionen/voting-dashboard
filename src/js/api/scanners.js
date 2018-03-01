import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const userURL = '/voting/scanners/'

export const getScanners = meetingID => fetchAPI(`${userURL}?meeting=${meetingID}`)

export const addScanner = (liuID, meeting) => postAPI(userURL, { username: liuID, meeting })

export const removeScanner = (scanner, meetingID) => deleteAPI(`${userURL}${scanner}/?meeting=${meetingID}`)
