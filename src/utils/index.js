import React from 'react'
import {Subscribe} from 'unstated'
import StateContainer from 'state'
import queryString from 'query-string'

// Retrieve, store and delete stuff in the local storage
export const get = (key, defaultValue = undefined) => {
  const item = localStorage.getItem(key)
  return item !== null ? JSON.parse(item) : defaultValue
}

export const set = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export const remove = key => localStorage.removeItem(key)

// Generates random IDs, used for the textField component
export const randomID = () => `id${Math.random().toString(36).substr(5)}${Date.now().toString().substr(9)}`

// export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// Sort a list by LiU-ID
export const liuIDSort = (a, b) => a.user.username.localeCompare(b.user.username)

export const alternativeSort = (a, b) => {
  if (a.num_votes < b.num_votes) {
    return 1
  } else if (a.num_votes > b.num_votes) {
    return -1
  }

  return 0
}

export const logOut = () => {
  remove('token')
  window.location.reload()
}

export const getToken = () => {
  let { token } = queryString.parse(window.location.search)

  if (token !== undefined) {
    window.history.replaceState(null, null, window.location.pathname)
  } else {
    token = get('token')
  }

  if (token !== undefined) {
    set('token', token)
  }
  return token
}

export const connect = Component => props => (
  <Subscribe to={[StateContainer]}>
    {container => (
      <Component {...props} {...container} {...container.state} />
    )}
  </Subscribe>
)
