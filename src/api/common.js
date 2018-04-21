import { get, logOut } from 'utils'
import { apiURL } from 'config'
import M from 'materialize-css'

const headers = token => ({
  Authorization: `JWT ${token}`,
  'Content-Type': 'application/json'
})

const doRequest = (endpoint, init) => {
  const token = get('token')
  return (
    fetch(`${apiURL}${endpoint}`, {
      headers: headers(token),
      ...init
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 401) {
            logOut()
          } else {
            response.json()
              .then(body =>
                M.toast({ html: body.error }))
            return Promise.resolve()
          }
        }

        if (init.method === 'DELETE') {
          return Promise.resolve()
        }
        return response.json()
      })
  )
}

export const fetchAPI = endpoint => doRequest(endpoint, {})

export const deleteAPI = endpoint => doRequest(endpoint, { method: 'DELETE' })

export const postAPI = (endpoint, data) => doRequest(endpoint, { method: 'POST', body: JSON.stringify(data) })

export const updateAPI = (endpoint, data) => doRequest(endpoint, { method: 'PATCH', body: JSON.stringify(data) })
