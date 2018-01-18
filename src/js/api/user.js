import { fetchAPI } from 'api/common'

const userURL = '/voting/attendants/'

export const getUsers = meetingID => (
  fetchAPI(userURL)
    .then(json => {
      if (meetingID) {
        return json.filter(user => user.meeting === meetingID)
      }
      return json
    })
)


export const addUser = liuID => {

}
