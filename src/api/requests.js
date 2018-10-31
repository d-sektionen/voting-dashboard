import { get, logOut } from '../common'
import { apiURL } from '../config'

// Super function for making a requests to the API
function doRequest (endpoint, init) {
  const token = get('token')

  const headers = {
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json'
  }

  return (
    fetch(`${apiURL}${endpoint}`, {
      headers,
      ...init
    })
      .then(response => {
        if (!response.ok) {
          // Bad token -> log out
          if (response.status === 401) {
            logOut()
          } else {
            // Something else bad happend, log it!
            response.json().then(body => console.error(body.error))
            return Promise.resolve()
          }
        }

        // Delete requests never contain a body so we just return an empty promise
        if (init.method === 'DELETE') {
          return Promise.resolve()
        }

        return response.json()
      })
  )
}

// Helper methods for making all the different kinds of requests
export function fetchAPI (endpoint) {
  return doRequest(endpoint, {})
}

export function deleteAPI (endpoint) {
  return doRequest(endpoint, { method: 'DELETE' })
}

// For creating new stuff
export function postAPI (endpoint, data) {
  return doRequest(endpoint, { method: 'POST', body: JSON.stringify(data) })
}

// For updating stuff
export function updateAPI (endpoint, data) {
  return doRequest(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
}
