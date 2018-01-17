import { json } from 'utils'
import { apiURL as url } from 'config'
import { getToken, header } from 'api/token'

export const getScanners = () => {
  getToken()
    .then(token => fetch(`${url}`, header(token)))
}
