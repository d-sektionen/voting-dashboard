import { json, get } from 'utils'
import { apiURL } from 'config'

const headers = token => ({
  Authorization: `JWT ${token}`,
  'Content-Type': 'application/json',
})

const doRequest = (endpoint, init) => {
  const token = get('token')
  return (
    fetch(`${apiURL}${endpoint}`, {
      headers: headers(token),
      ...init,
    })
      .then(json)
  )
}

export const fetchAPI = endpoint => doRequest(endpoint, {})

export const deleteAPI = endpoint => doRequest(endpoint, { method: 'DELETE' })

export const postAPI = (endpoint, data) => doRequest(endpoint, { method: 'POST', body: JSON.stringify(data) })

export const updateAPI = (endpoint, data) => doRequest(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
