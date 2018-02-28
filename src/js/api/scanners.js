import { fetchAPI, postAPI, deleteAPI } from 'api/common'

const userURL = '/voting/scanners/'

export const getScanners = () => fetchAPI(`${userURL}`)

export const addScanner = (liuID, meeting) => postAPI(userURL, { username: liuID, meeting })

export const removeScanner = scanner => deleteAPI(`${userURL}${scanner}/`)
