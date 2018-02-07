import { fetchAPI } from 'api/common'

const usernameURL = '/account/user/me/'

export const getUsername = () => fetchAPI(usernameURL)
