import { json } from 'utils'
import { apiURL as url } from 'config'
import { getToken, hasToken } from 'api/token'

const headers = token => ({
  Authorization: `JWT ${token}`,
  'Content-Type': 'application/json',
})

const doRequest = (endpoint, init) => {
  if (hasToken()) {
    return (
      getToken()
        .then(token => fetch(`${url}${endpoint}`, {
          headers: headers(token),
          ...init,
        }))
        .then(json)
    )
  }
  return Promise.reject(new Error('Missing token, you are most likely not logged in.'))
}

export const fetchAPI = endpoint => doRequest(endpoint, {})

export const postAPI = (endpoint, data) => doRequest(endpoint, { method: 'POST', body: JSON.stringify(data) })

export const updateAPI = (endpoint, data) => doRequest(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
