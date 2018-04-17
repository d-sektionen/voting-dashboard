import { fetchAPI } from 'api/common'

const userInfoURL = '/account/user/me/'

export const getUserInfo = () => fetchAPI(userInfoURL)
  .then(userInfo => ({
    userName: userInfo.username,
    firstName: userInfo.first_name,
    lastName: userInfo.last_name,
    sections: userInfo.sections
  }))
