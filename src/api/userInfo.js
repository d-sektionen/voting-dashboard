import { fetchAPI } from 'api/common'

const userInfoURL = '/account/user/me/'

export const getUserInfo = () => fetchAPI(userInfoURL)
