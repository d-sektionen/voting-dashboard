import { json } from 'utils'
import { apiURL as url } from 'config'
import { getToken, header } from 'api/token'

export const getUsers = meetingID => {
  getToken()
    .then(token => fetch(`${url}/voting/attendants/`, header(token)))
    .then(json)
    .then(jsonData => {
      if (meetingID) {
        return jsonData.filter(user => user.meeting === meetingID)
      }
      return jsonData
    })
}


export const addUser = liuID => {

}
