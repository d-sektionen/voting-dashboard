import { get, store, remove, json } from 'utils'
import { apiURL as url } from 'config'

const tokenStorageKey = 'token'

export const getToken = () => {
  const storedToken = get(tokenStorageKey)

  // Use cached token from localStorage if one exist
  if (storedToken) {
    return Promise.resolve(storedToken)
  }

  // Otherwise get a new one
  return (
    fetch(`${url}/account/token`)
      .then(json)
      .then(jsonData => {
        store(tokenStorageKey, jsonData.token)
        return jsonData.token
      })
  )
}

export const deleteToken = () => {
  remove(tokenStorageKey)
}

export const header = token => ({
  Authorization: `JWT ${token}`,
})
